import { DataItem } from 'ethereum-types';
import { SetCalldataBlock } from '../../calldata/blocks/set';
import { CalldataBlock } from '../../calldata/calldata_block';
import { RawCalldata } from '../../calldata/raw_calldata';
import { DecodingRules } from '../../utils/rules';
import { DataType } from '../data_type';
import { DataTypeFactory } from '../interfaces';
export declare abstract class AbstractSetDataType extends DataType {
    protected readonly _arrayLength: number | undefined;
    protected readonly _arrayElementType: string | undefined;
    private readonly _memberIndexByName;
    private readonly _members;
    private readonly _isArray;
    constructor(dataItem: DataItem, factory: DataTypeFactory, isArray?: boolean, arrayLength?: number, arrayElementType?: string);
    generateCalldataBlock(value: any[] | object, parentBlock?: CalldataBlock): SetCalldataBlock;
    generateValue(calldata: RawCalldata, rules: DecodingRules): any[] | object;
    isStatic(): boolean;
    getDefaultValue(rules?: DecodingRules): any[] | object;
    protected _generateCalldataBlockFromArray(value: any[], parentBlock?: CalldataBlock): SetCalldataBlock;
    protected _generateCalldataBlockFromObject(obj: object, parentBlock?: CalldataBlock): SetCalldataBlock;
    protected _computeSignatureOfMembers(isDetailed?: boolean): string;
    private _createMembersWithKeys;
    private _createMembersWithLength;
}
//# sourceMappingURL=set.d.ts.map