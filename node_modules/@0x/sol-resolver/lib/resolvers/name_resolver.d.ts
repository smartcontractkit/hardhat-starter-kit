import { ContractSource } from '../types';
import { EnumerableResolver } from './enumerable_resolver';
export declare class NameResolver extends EnumerableResolver {
    private readonly _contractsDir;
    constructor(contractsDir: string);
    resolveIfExists(lookupContractName: string): ContractSource | undefined;
    getAll(): ContractSource[];
    private _traverseContractsDir;
}
//# sourceMappingURL=name_resolver.d.ts.map