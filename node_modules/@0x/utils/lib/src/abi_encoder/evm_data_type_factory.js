"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const signature_parser_1 = require("./utils/signature_parser");
const address_1 = require("./evm_data_types/address");
const array_1 = require("./evm_data_types/array");
const bool_1 = require("./evm_data_types/bool");
const dynamic_bytes_1 = require("./evm_data_types/dynamic_bytes");
const int_1 = require("./evm_data_types/int");
const method_1 = require("./evm_data_types/method");
const pointer_1 = require("./evm_data_types/pointer");
const static_bytes_1 = require("./evm_data_types/static_bytes");
const string_1 = require("./evm_data_types/string");
const tuple_1 = require("./evm_data_types/tuple");
const uint_1 = require("./evm_data_types/uint");
class Address extends address_1.AddressDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.Address = Address;
class Bool extends bool_1.BoolDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.Bool = Bool;
class Int extends int_1.IntDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.Int = Int;
class UInt extends uint_1.UIntDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.UInt = UInt;
class StaticBytes extends static_bytes_1.StaticBytesDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.StaticBytes = StaticBytes;
class DynamicBytes extends dynamic_bytes_1.DynamicBytesDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.DynamicBytes = DynamicBytes;
class String extends string_1.StringDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.String = String;
class Pointer extends pointer_1.PointerDataType {
    constructor(destDataType, parentDataType) {
        super(destDataType, parentDataType, EvmDataTypeFactory.getInstance());
    }
}
exports.Pointer = Pointer;
class Tuple extends tuple_1.TupleDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.Tuple = Tuple;
class Array extends array_1.ArrayDataType {
    constructor(dataItem) {
        super(dataItem, EvmDataTypeFactory.getInstance());
    }
}
exports.Array = Array;
class Method extends method_1.MethodDataType {
    constructor(abi) {
        super(abi, EvmDataTypeFactory.getInstance());
    }
}
exports.Method = Method;
/* tslint:disable no-construct */
class EvmDataTypeFactory {
    static getInstance() {
        if (!EvmDataTypeFactory._instance) {
            EvmDataTypeFactory._instance = new EvmDataTypeFactory();
        }
        return EvmDataTypeFactory._instance;
    }
    /* tslint:disable prefer-function-over-method */
    create(dataItem, parentDataType) {
        // Create data type
        let dataType;
        if (Array.matchType(dataItem.type)) {
            dataType = new Array(dataItem);
        }
        else if (Address.matchType(dataItem.type)) {
            dataType = new Address(dataItem);
        }
        else if (Bool.matchType(dataItem.type)) {
            dataType = new Bool(dataItem);
        }
        else if (Int.matchType(dataItem.type)) {
            dataType = new Int(dataItem);
        }
        else if (UInt.matchType(dataItem.type)) {
            dataType = new UInt(dataItem);
        }
        else if (StaticBytes.matchType(dataItem.type)) {
            dataType = new StaticBytes(dataItem);
        }
        else if (Tuple.matchType(dataItem.type)) {
            dataType = new Tuple(dataItem);
        }
        else if (DynamicBytes.matchType(dataItem.type)) {
            dataType = new DynamicBytes(dataItem);
        }
        else if (String.matchType(dataItem.type)) {
            dataType = new String(dataItem);
        }
        // @TODO: DataTypeement Fixed/UFixed types
        if (dataType === undefined) {
            throw new Error(`Unrecognized data type: '${dataItem.type}'`);
        }
        else if (parentDataType !== undefined && !dataType.isStatic()) {
            const pointerToDataType = new Pointer(dataType, parentDataType);
            return pointerToDataType;
        }
        return dataType;
    }
    /* tslint:enable prefer-function-over-method */
    constructor() { }
}
exports.EvmDataTypeFactory = EvmDataTypeFactory;
/**
 * Convenience function for creating a DataType from different inputs.
 * @param input A single or set of DataItem or a signature for an EVM data type.
 * @return DataType corresponding to input.
 */
function create(input) {
    const dataItem = consolidateDataItemsIntoSingle(input);
    const dataType = EvmDataTypeFactory.getInstance().create(dataItem);
    return dataType;
}
exports.create = create;
/**
 * Convenience function to aggregate a single input or a set of inputs into a single DataItem.
 * An array of data items is grouped into a single tuple.
 * @param input A single data item; a set of data items; a signature.
 * @return A single data item corresponding to input.
 */
function consolidateDataItemsIntoSingle(input) {
    let dataItem;
    if (_.isArray(input)) {
        const dataItems = input;
        dataItem = {
            name: '',
            type: 'tuple',
            components: dataItems,
        };
    }
    else {
        dataItem = _.isString(input) ? signature_parser_1.generateDataItemFromSignature(input) : input;
    }
    return dataItem;
}
/**
 * Convenience function for creating a Method encoder from different inputs.
 * @param methodName name of method.
 * @param input A single data item; a set of data items; a signature; or an array of signatures (optional).
 * @param output A single data item; a set of data items; a signature; or an array of signatures (optional).
 * @return Method corresponding to input.
 */
function createMethod(methodName, input, output) {
    const methodInput = input === undefined ? [] : consolidateDataItemsIntoArray(input);
    const methodOutput = output === undefined ? [] : consolidateDataItemsIntoArray(output);
    const methodAbi = {
        name: methodName,
        inputs: methodInput,
        outputs: methodOutput,
        type: 'function',
        // default fields not used by ABI
        constant: false,
        payable: false,
        stateMutability: 'nonpayable',
    };
    const dataType = new Method(methodAbi);
    return dataType;
}
exports.createMethod = createMethod;
/**
 * Convenience function that aggregates a single input or a set of inputs into an array of DataItems.
 * @param input A single data item; a set of data items; a signature; or an array of signatures.
 * @return Array of data items corresponding to input.
 */
function consolidateDataItemsIntoArray(input) {
    let dataItems;
    if (_.isArray(input) && _.isEmpty(input)) {
        dataItems = [];
    }
    else if (_.isArray(input) && _.isString(input[0])) {
        dataItems = [];
        _.each(input, (signature) => {
            const dataItem = signature_parser_1.generateDataItemFromSignature(signature);
            dataItems.push(dataItem);
        });
    }
    else if (_.isArray(input)) {
        dataItems = input;
    }
    else if (typeof input === 'string') {
        const dataItem = signature_parser_1.generateDataItemFromSignature(input);
        dataItems = [dataItem];
    }
    else {
        dataItems = [input];
    }
    return dataItems;
}
/* tslint:enable no-construct */
//# sourceMappingURL=evm_data_type_factory.js.map