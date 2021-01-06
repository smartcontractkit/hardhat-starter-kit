import { DataItem } from 'ethereum-types';
import { CalldataBlock } from '../calldata/calldata_block';
import { RawCalldata } from '../calldata/raw_calldata';
import { DecodingRules, EncodingRules } from '../utils/rules';
import { DataTypeFactory } from './interfaces';
export declare abstract class DataType {
    private readonly _dataItem;
    private readonly _factory;
    constructor(dataItem: DataItem, factory: DataTypeFactory);
    getDataItem(): DataItem;
    getFactory(): DataTypeFactory;
    encode(value: any, rules?: Partial<EncodingRules>, selector?: string): string;
    decode(calldata: string, rules?: Partial<DecodingRules>, selector?: string): any;
    decodeAsArray(returndata: string, rules?: Partial<DecodingRules>): any[];
    getSignature(isDetailed?: boolean): string;
    abstract generateCalldataBlock(value: any, parentBlock?: CalldataBlock): CalldataBlock;
    abstract generateValue(calldata: RawCalldata, rules: DecodingRules): any;
    abstract getDefaultValue(rules?: DecodingRules): any;
    abstract getSignatureType(): string;
    abstract isStatic(): boolean;
}
//# sourceMappingURL=data_type.d.ts.map