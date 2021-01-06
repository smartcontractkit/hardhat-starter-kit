import { ContractSource } from '../types';
import { Resolver } from './resolver';
export declare class RelativeFSResolver extends Resolver {
    private readonly _contractsDir;
    constructor(contractsDir: string);
    resolveIfExists(importPath: string): ContractSource | undefined;
}
//# sourceMappingURL=relative_fs_resolver.d.ts.map