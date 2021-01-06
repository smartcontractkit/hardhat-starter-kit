"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pointer_1 = require("../abstract_data_types/types/pointer");
class PointerDataType extends pointer_1.AbstractPointerDataType {
    constructor(destDataType, parentDataType, dataTypeFactory) {
        const destDataItem = destDataType.getDataItem();
        const dataItem = { name: `ptr<${destDataItem.name}>`, type: `ptr<${destDataItem.type}>` };
        super(dataItem, dataTypeFactory, destDataType, parentDataType);
    }
    getSignatureType() {
        return this._destination.getSignature(false);
    }
    getSignature(isDetailed) {
        return this._destination.getSignature(isDetailed);
    }
    getDefaultValue() {
        const defaultValue = this._destination.getDefaultValue();
        return defaultValue;
    }
}
exports.PointerDataType = PointerDataType;
//# sourceMappingURL=pointer.js.map