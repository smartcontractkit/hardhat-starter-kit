import { DataItem } from 'ethereum-types';
import { PointerCalldataBlock } from '../../calldata/blocks/pointer';
import { CalldataBlock } from '../../calldata/calldata_block';
import { RawCalldata } from '../../calldata/raw_calldata';
import { DecodingRules } from '../../utils/rules';
import { DataType } from '../data_type';
import { DataTypeFactory } from '../interfaces';
export declare abstract class AbstractPointerDataType extends DataType {
    protected _destination: DataType;
    protected _parent: DataType;
    constructor(dataItem: DataItem, factory: DataTypeFactory, destination: DataType, parent: DataType);
    generateCalldataBlock(value: any, parentBlock?: CalldataBlock): PointerCalldataBlock;
    generateValue(calldata: RawCalldata, rules: DecodingRules): any;
    isStatic(): boolean;
}
//# sourceMappingURL=pointer.d.ts.map