import { DataItem, MethodAbi } from 'ethereum-types';
import { DataType } from './abstract_data_types/data_type';
import { DataTypeFactory } from './abstract_data_types/interfaces';
import { AddressDataType } from './evm_data_types/address';
import { ArrayDataType } from './evm_data_types/array';
import { BoolDataType } from './evm_data_types/bool';
import { DynamicBytesDataType } from './evm_data_types/dynamic_bytes';
import { IntDataType } from './evm_data_types/int';
import { MethodDataType } from './evm_data_types/method';
import { PointerDataType } from './evm_data_types/pointer';
import { StaticBytesDataType } from './evm_data_types/static_bytes';
import { StringDataType } from './evm_data_types/string';
import { TupleDataType } from './evm_data_types/tuple';
import { UIntDataType } from './evm_data_types/uint';
export declare class Address extends AddressDataType {
    constructor(dataItem: DataItem);
}
export declare class Bool extends BoolDataType {
    constructor(dataItem: DataItem);
}
export declare class Int extends IntDataType {
    constructor(dataItem: DataItem);
}
export declare class UInt extends UIntDataType {
    constructor(dataItem: DataItem);
}
export declare class StaticBytes extends StaticBytesDataType {
    constructor(dataItem: DataItem);
}
export declare class DynamicBytes extends DynamicBytesDataType {
    constructor(dataItem: DataItem);
}
export declare class String extends StringDataType {
    constructor(dataItem: DataItem);
}
export declare class Pointer extends PointerDataType {
    constructor(destDataType: DataType, parentDataType: DataType);
}
export declare class Tuple extends TupleDataType {
    constructor(dataItem: DataItem);
}
export declare class Array extends ArrayDataType {
    constructor(dataItem: DataItem);
}
export declare class Method extends MethodDataType {
    constructor(abi: MethodAbi);
}
export declare class EvmDataTypeFactory implements DataTypeFactory {
    private static _instance;
    static getInstance(): DataTypeFactory;
    create(dataItem: DataItem, parentDataType?: DataType): DataType;
    private constructor();
}
/**
 * Convenience function for creating a DataType from different inputs.
 * @param input A single or set of DataItem or a signature for an EVM data type.
 * @return DataType corresponding to input.
 */
export declare function create(input: DataItem | DataItem[] | string): DataType;
/**
 * Convenience function for creating a Method encoder from different inputs.
 * @param methodName name of method.
 * @param input A single data item; a set of data items; a signature; or an array of signatures (optional).
 * @param output A single data item; a set of data items; a signature; or an array of signatures (optional).
 * @return Method corresponding to input.
 */
export declare function createMethod(methodName: string, input?: DataItem | DataItem[] | string | string[], output?: DataItem | DataItem[] | string | string[]): Method;
//# sourceMappingURL=evm_data_type_factory.d.ts.map