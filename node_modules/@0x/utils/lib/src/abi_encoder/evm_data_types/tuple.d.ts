import { DataItem } from 'ethereum-types';
import { DataTypeFactory } from '../abstract_data_types/interfaces';
import { AbstractSetDataType } from '../abstract_data_types/types/set';
export declare class TupleDataType extends AbstractSetDataType {
    static matchType(type: string): boolean;
    constructor(dataItem: DataItem, dataTypeFactory: DataTypeFactory);
    getSignatureType(): string;
    getSignature(isDetailed?: boolean): string;
}
//# sourceMappingURL=tuple.d.ts.map