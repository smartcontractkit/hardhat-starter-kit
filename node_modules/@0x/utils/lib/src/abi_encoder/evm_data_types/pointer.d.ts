import { DataType } from '../abstract_data_types/data_type';
import { DataTypeFactory } from '../abstract_data_types/interfaces';
import { AbstractPointerDataType } from '../abstract_data_types/types/pointer';
export declare class PointerDataType extends AbstractPointerDataType {
    constructor(destDataType: DataType, parentDataType: DataType, dataTypeFactory: DataTypeFactory);
    getSignatureType(): string;
    getSignature(isDetailed?: boolean): string;
    getDefaultValue(): any;
}
//# sourceMappingURL=pointer.d.ts.map