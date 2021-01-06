"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const set_1 = require("../abstract_data_types/types/set");
const constants_1 = require("../utils/constants");
class ArrayDataType extends set_1.AbstractSetDataType {
    constructor(dataItem, dataTypeFactory) {
        // Construct parent
        const isArray = true;
        const [arrayElementType, arrayLength] = ArrayDataType._decodeElementTypeAndLengthFromType(dataItem.type);
        super(dataItem, dataTypeFactory, isArray, arrayLength, arrayElementType);
        // Set array properties
        this._elementType = arrayElementType;
    }
    static matchType(type) {
        return ArrayDataType._MATCHER.test(type);
    }
    static _decodeElementTypeAndLengthFromType(type) {
        const matches = ArrayDataType._MATCHER.exec(type);
        if (matches === null || matches.length !== 3) {
            throw new Error(`Could not parse array: ${type}`);
        }
        else if (matches[1] === undefined) {
            throw new Error(`Could not parse array type: ${type}`);
        }
        else if (matches[2] === undefined) {
            throw new Error(`Could not parse array length: ${type}`);
        }
        const arrayElementType = matches[1];
        const arrayLength = _.isEmpty(matches[2]) ? undefined : parseInt(matches[2], constants_1.constants.DEC_BASE);
        return [arrayElementType, arrayLength];
    }
    getSignatureType() {
        return this._computeSignature(false);
    }
    getSignature(isDetailed) {
        if (_.isEmpty(this.getDataItem().name) || !isDetailed) {
            return this.getSignatureType();
        }
        const name = this.getDataItem().name;
        const lastIndexOfScopeDelimiter = name.lastIndexOf('.');
        const isScopedName = lastIndexOfScopeDelimiter !== undefined && lastIndexOfScopeDelimiter > 0;
        const shortName = isScopedName ? name.substr(lastIndexOfScopeDelimiter + 1) : name;
        const detailedSignature = `${shortName} ${this._computeSignature(isDetailed)}`;
        return detailedSignature;
    }
    _computeSignature(isDetailed) {
        // Compute signature for a single array element
        const elementDataItem = {
            type: this._elementType,
            name: '',
        };
        const elementComponents = this.getDataItem().components;
        if (elementComponents !== undefined) {
            elementDataItem.components = elementComponents;
        }
        const elementDataType = this.getFactory().create(elementDataItem);
        const elementSignature = elementDataType.getSignature(isDetailed);
        // Construct signature for array of type `element`
        if (this._arrayLength === undefined) {
            return `${elementSignature}[]`;
        }
        else {
            return `${elementSignature}[${this._arrayLength}]`;
        }
    }
}
ArrayDataType._MATCHER = RegExp('^(.+)\\[([0-9]*)\\]$');
exports.ArrayDataType = ArrayDataType;
//# sourceMappingURL=array.js.map