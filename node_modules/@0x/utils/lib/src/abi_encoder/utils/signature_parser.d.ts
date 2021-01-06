import { DataItem } from 'ethereum-types';
/**
 * Returns a DataItem corresponding to the input signature.
 * A signature can be in two forms: `type` or `(type_1,type_2,...,type_n)`
 * An example of the first form would be 'address' or 'uint256[]' or 'bytes[5][]'
 * An example of the second form would be '(address,uint256)' or '(address,uint256)[]'
 * @param signature of input DataItem.
 * @return DataItem derived from input signature.
 */
export declare function generateDataItemFromSignature(signature: string): DataItem;
//# sourceMappingURL=signature_parser.d.ts.map