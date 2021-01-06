import { DataItem } from 'ethereum-types';
import { DataTypeFactory } from '../abstract_data_types/interfaces';
import { AbstractSetDataType } from '../abstract_data_types/types/set';
export declare class ArrayDataType extends AbstractSetDataType {
    private static readonly _MATCHER;
    private readonly _elementType;
    static matchType(type: string): boolean;
    private static _decodeElementTypeAndLengthFromType;
    constructor(dataItem: DataItem, dataTypeFactory: DataTypeFactory);
    getSignatureType(): string;
    getSignature(isDetailed?: boolean): string;
    private _computeSignature;
}
//# sourceMappingURL=array.d.ts.map