"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const calldata_block_1 = require("../calldata_block");
class SetCalldataBlock extends calldata_block_1.CalldataBlock {
    constructor(name, signature, parentName) {
        super(name, signature, parentName, 0, 0);
        this._members = [];
        this._header = undefined;
    }
    getRawData() {
        const rawDataComponents = [];
        if (this._header !== undefined) {
            rawDataComponents.push(this._header);
        }
        _.each(this._members, (member) => {
            const memberBuffer = member.getRawData();
            rawDataComponents.push(memberBuffer);
        });
        const rawData = Buffer.concat(rawDataComponents);
        return rawData;
    }
    setMembers(members) {
        this._members = members;
    }
    setHeader(header) {
        this._setHeaderSize(header.byteLength);
        this._header = header;
    }
    toBuffer() {
        if (this._header !== undefined) {
            return this._header;
        }
        return Buffer.from('');
    }
    getMembers() {
        return this._members;
    }
}
exports.SetCalldataBlock = SetCalldataBlock;
//# sourceMappingURL=set.js.map