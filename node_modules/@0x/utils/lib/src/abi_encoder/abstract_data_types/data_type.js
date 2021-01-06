"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const calldata_1 = require("../calldata/calldata");
const raw_calldata_1 = require("../calldata/raw_calldata");
const constants_1 = require("../utils/constants");
class DataType {
    constructor(dataItem, factory) {
        this._dataItem = dataItem;
        this._factory = factory;
    }
    getDataItem() {
        return this._dataItem;
    }
    getFactory() {
        return this._factory;
    }
    encode(value, rules, selector) {
        const rules_ = Object.assign({}, constants_1.constants.DEFAULT_ENCODING_RULES, rules);
        const calldata = new calldata_1.Calldata(rules_);
        if (selector !== undefined) {
            calldata.setSelector(selector);
        }
        const block = this.generateCalldataBlock(value);
        calldata.setRoot(block);
        const encodedCalldata = calldata.toString();
        return encodedCalldata;
    }
    decode(calldata, rules, selector) {
        if (selector !== undefined && !_.startsWith(calldata, selector)) {
            throw new Error(`Tried to decode calldata, but it was missing the function selector. Expected prefix '${selector}'. Got '${calldata}'.`);
        }
        const hasSelector = selector !== undefined;
        const rawCalldata = new raw_calldata_1.RawCalldata(calldata, hasSelector);
        const rules_ = Object.assign({}, constants_1.constants.DEFAULT_DECODING_RULES, rules);
        const value = rules_.isStrictMode || rawCalldata.getSizeInBytes() > 0
            ? this.generateValue(rawCalldata, rules_)
            : this.getDefaultValue(rules_);
        return value;
    }
    decodeAsArray(returndata, rules) {
        const value = this.decode(returndata, rules);
        const valuesAsArray = _.isObject(value) ? _.values(value) : [value];
        return valuesAsArray;
    }
    getSignature(isDetailed) {
        if (_.isEmpty(this._dataItem.name) || !isDetailed) {
            return this.getSignatureType();
        }
        const name = this.getDataItem().name;
        const lastIndexOfScopeDelimiter = name.lastIndexOf('.');
        const isScopedName = lastIndexOfScopeDelimiter !== undefined && lastIndexOfScopeDelimiter > 0;
        const shortName = isScopedName ? name.substr(lastIndexOfScopeDelimiter + 1) : name;
        const detailedSignature = `${shortName} ${this.getSignatureType()}`;
        return detailedSignature;
    }
}
exports.DataType = DataType;
//# sourceMappingURL=data_type.js.map