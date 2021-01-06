import { AbiDefinition, DataItem, MethodAbi } from 'ethereum-types';
declare type ParamName = null | string | NestedParamName;
interface NestedParamName {
    name: string | null;
    names: ParamName[];
}
declare function parseEthersParams(params: DataItem[]): {
    names: ParamName[];
    types: string[];
};
declare function isAbiDataEqual(name: ParamName, type: string, x: any, y: any): boolean;
declare function splitTupleTypes(type: string): string[];
export declare const abiUtils: {
    parseEthersParams: typeof parseEthersParams;
    isAbiDataEqual: typeof isAbiDataEqual;
    splitTupleTypes: typeof splitTupleTypes;
    parseFunctionParam(param: DataItem): string;
    getFunctionSignature(methodAbi: MethodAbi): string;
    /**
     * Solidity supports function overloading whereas TypeScript does not.
     * See: https://solidity.readthedocs.io/en/v0.4.21/contracts.html?highlight=overload#function-overloading
     * In order to support overloaded functions, we suffix overloaded function names with an index.
     * This index should be deterministic, regardless of function ordering within the smart contract. To do so,
     * we assign indexes based on the alphabetical order of function signatures.
     *
     * E.g
     * ['f(uint)', 'f(uint,byte32)']
     * Should always be renamed to:
     * ['f1(uint)', 'f2(uint,byte32)']
     * Regardless of the order in which these these overloaded functions are declared within the contract ABI.
     */
    renameOverloadedMethods(inputContractAbi: AbiDefinition[]): AbiDefinition[];
};
export {};
//# sourceMappingURL=abi_utils.d.ts.map