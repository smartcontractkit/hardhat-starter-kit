"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ethereum_types_1 = require("ethereum-types");
const _ = require("lodash");
const set_1 = require("../abstract_data_types/types/set");
class TupleDataType extends set_1.AbstractSetDataType {
    static matchType(type) {
        return type === ethereum_types_1.SolidityTypes.Tuple;
    }
    constructor(dataItem, dataTypeFactory) {
        super(dataItem, dataTypeFactory);
        if (!TupleDataType.matchType(dataItem.type)) {
            throw new Error(`Tried to instantiate Tuple with bad input: ${dataItem}`);
        }
    }
    getSignatureType() {
        return this._computeSignatureOfMembers(false);
    }
    getSignature(isDetailed) {
        if (_.isEmpty(this.getDataItem().name) || !isDetailed) {
            return this.getSignatureType();
        }
        const name = this.getDataItem().name;
        const lastIndexOfScopeDelimiter = name.lastIndexOf('.');
        const isScopedName = lastIndexOfScopeDelimiter !== undefined && lastIndexOfScopeDelimiter > 0;
        const shortName = isScopedName ? name.substr(lastIndexOfScopeDelimiter + 1) : name;
        const detailedSignature = `${shortName} ${this._computeSignatureOfMembers(isDetailed)}`;
        return detailedSignature;
    }
}
exports.TupleDataType = TupleDataType;
//# sourceMappingURL=tuple.js.map