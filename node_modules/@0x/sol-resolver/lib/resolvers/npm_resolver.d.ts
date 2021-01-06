import { ContractSource } from '../types';
import { Resolver } from './resolver';
export declare class NPMResolver extends Resolver {
    private readonly _packagePath;
    constructor(packagePath: string);
    resolveIfExists(importPath: string): ContractSource | undefined;
}
//# sourceMappingURL=npm_resolver.d.ts.map