"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethUtil = require("ethereumjs-util");
const _ = require("lodash");
const configured_bignumber_1 = require("../../../configured_bignumber");
const set_1 = require("../../calldata/blocks/set");
const constants_1 = require("../../utils/constants");
const data_type_1 = require("../data_type");
const pointer_1 = require("./pointer");
class AbstractSetDataType extends data_type_1.DataType {
    constructor(dataItem, factory, isArray = false, arrayLength, arrayElementType) {
        super(dataItem, factory);
        this._memberIndexByName = {};
        this._members = [];
        this._isArray = isArray;
        this._arrayLength = arrayLength;
        this._arrayElementType = arrayElementType;
        if (isArray && arrayLength !== undefined) {
            [this._members, this._memberIndexByName] = this._createMembersWithLength(dataItem, arrayLength);
        }
        else if (!isArray) {
            [this._members, this._memberIndexByName] = this._createMembersWithKeys(dataItem);
        }
    }
    generateCalldataBlock(value, parentBlock) {
        const block = Array.isArray(value)
            ? this._generateCalldataBlockFromArray(value, parentBlock)
            : this._generateCalldataBlockFromObject(value, parentBlock);
        return block;
    }
    generateValue(calldata, rules) {
        let members = this._members;
        // Case 1: This is an array of undefined length, which means that `this._members` was not
        //         populated in the constructor. So we must construct the set of members now.
        if (this._isArray && this._arrayLength === undefined) {
            const arrayLengthBuf = calldata.popWord();
            const arrayLengthHex = ethUtil.bufferToHex(arrayLengthBuf);
            const arrayLength = new configured_bignumber_1.BigNumber(arrayLengthHex, constants_1.constants.HEX_BASE);
            [members] = this._createMembersWithLength(this.getDataItem(), arrayLength.toNumber());
        }
        // Create a new scope in the calldata, before descending into the members of this set.
        calldata.startScope();
        let value;
        if (rules.shouldConvertStructsToObjects && !this._isArray) {
            // Construct an object with values for each member of the set.
            value = {};
            _.each(this._memberIndexByName, (idx, key) => {
                const member = this._members[idx];
                const memberValue = member.generateValue(calldata, rules);
                value[key] = memberValue;
            });
        }
        else {
            // Construct an array with values for each member of the set.
            value = [];
            _.each(members, (member, idx) => {
                const memberValue = member.generateValue(calldata, rules);
                value.push(memberValue);
            });
        }
        // Close this scope and return tetheh value.
        calldata.endScope();
        return value;
    }
    isStatic() {
        // An array with an undefined length is never static.
        if (this._isArray && this._arrayLength === undefined) {
            return false;
        }
        // If any member of the set is a pointer then the set is not static.
        const dependentMember = _.find(this._members, (member) => {
            return member instanceof pointer_1.AbstractPointerDataType;
        });
        const isStatic = dependentMember === undefined;
        return isStatic;
    }
    getDefaultValue(rules) {
        let defaultValue;
        if (this._isArray && this._arrayLength === undefined) {
            defaultValue = [];
        }
        else if (rules !== undefined && rules.shouldConvertStructsToObjects && !this._isArray) {
            defaultValue = {};
            _.each(this._memberIndexByName, (idx, key) => {
                const member = this._members[idx];
                const memberValue = member.getDefaultValue();
                defaultValue[key] = memberValue;
            });
        }
        else {
            defaultValue = [];
            _.each(this._members, (member, idx) => {
                const memberValue = member.getDefaultValue();
                defaultValue.push(memberValue);
            });
        }
        return defaultValue;
    }
    _generateCalldataBlockFromArray(value, parentBlock) {
        // Sanity check: if the set has a defined length then `value` must have the same length.
        if (this._arrayLength !== undefined && value.length !== this._arrayLength) {
            throw new Error(`Expected array of ${JSON.stringify(this._arrayLength)} elements, but got array of length ${JSON.stringify(value.length)}`);
        }
        // Create a new calldata block for this set.
        const parentName = parentBlock === undefined ? '' : parentBlock.getName();
        const block = new set_1.SetCalldataBlock(this.getDataItem().name, this.getSignature(), parentName);
        // If this set has an undefined length then set its header to be the number of elements.
        let members = this._members;
        if (this._isArray && this._arrayLength === undefined) {
            [members] = this._createMembersWithLength(this.getDataItem(), value.length);
            const lenBuf = ethUtil.setLengthLeft(ethUtil.toBuffer(`0x${value.length.toString(constants_1.constants.HEX_BASE)}`), constants_1.constants.EVM_WORD_WIDTH_IN_BYTES);
            block.setHeader(lenBuf);
        }
        // Create blocks for members of set.
        const memberCalldataBlocks = [];
        _.each(members, (member, idx) => {
            const memberBlock = member.generateCalldataBlock(value[idx], block);
            memberCalldataBlocks.push(memberBlock);
        });
        block.setMembers(memberCalldataBlocks);
        return block;
    }
    _generateCalldataBlockFromObject(obj, parentBlock) {
        // Create a new calldata block for this set.
        const parentName = parentBlock === undefined ? '' : parentBlock.getName();
        const block = new set_1.SetCalldataBlock(this.getDataItem().name, this.getSignature(), parentName);
        // Create blocks for members of set.
        const memberCalldataBlocks = [];
        _.forEach(this._memberIndexByName, (memberIndex, memberName) => {
            if (!(memberName in obj)) {
                throw new Error(`Could not assign tuple to object: missing key '${memberName}' in object ${JSON.stringify(obj)}`);
            }
            const memberValue = obj[memberName];
            const memberBlock = this._members[memberIndex].generateCalldataBlock(memberValue, block);
            memberCalldataBlocks.push(memberBlock);
        });
        // Associate member blocks with Set block.
        block.setMembers(memberCalldataBlocks);
        return block;
    }
    _computeSignatureOfMembers(isDetailed) {
        // Compute signature of members
        let signature = `(`;
        _.each(this._members, (member, i) => {
            signature += member.getSignature(isDetailed);
            if (i < this._members.length - 1) {
                signature += ',';
            }
        });
        signature += ')';
        return signature;
    }
    _createMembersWithKeys(dataItem) {
        // Sanity check
        if (dataItem.components === undefined) {
            throw new Error(`Tried to create a set using key/value pairs, but no components were defined by the input DataItem '${dataItem.name}'.`);
        }
        // Create one member for each component of `dataItem`
        const members = [];
        const memberIndexByName = {};
        const memberNames = [];
        _.each(dataItem.components, (memberItem) => {
            // If a component with `name` already exists then
            // rename to `name_nameIdx` to avoid naming conflicts.
            let memberName = memberItem.name;
            let nameIdx = 0;
            while (_.includes(memberNames, memberName) || _.isEmpty(memberName)) {
                nameIdx++;
                memberName = `${memberItem.name}_${nameIdx}`;
            }
            memberNames.push(memberName);
            const childDataItem = {
                type: memberItem.type,
                name: `${dataItem.name}.${memberName}`,
            };
            const components = memberItem.components;
            if (components !== undefined) {
                childDataItem.components = components;
            }
            const child = this.getFactory().create(childDataItem, this);
            memberIndexByName[memberName] = members.length;
            members.push(child);
        });
        return [members, memberIndexByName];
    }
    _createMembersWithLength(dataItem, length) {
        // Create `length` members, deriving the type from `dataItem`
        const members = [];
        const memberIndexByName = {};
        const range = _.range(length);
        _.each(range, (idx) => {
            const memberDataItem = {
                type: this._arrayElementType === undefined ? '' : this._arrayElementType,
                name: `${dataItem.name}[${idx.toString(constants_1.constants.DEC_BASE)}]`,
            };
            const components = dataItem.components;
            if (components !== undefined) {
                memberDataItem.components = components;
            }
            const memberType = this.getFactory().create(memberDataItem, this);
            memberIndexByName[idx.toString(constants_1.constants.DEC_BASE)] = members.length;
            members.push(memberType);
        });
        return [members, memberIndexByName];
    }
}
exports.AbstractSetDataType = AbstractSetDataType;
//# sourceMappingURL=set.js.map