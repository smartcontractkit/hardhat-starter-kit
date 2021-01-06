import { ContractSource } from '../types';
import { Resolver } from './resolver';
/**
 * This resolver is a passthrough proxy to any resolver that records all the resolved contracts sources.
 * You can access them later using the `resolvedContractSources` public field.
 */
export declare class SpyResolver extends Resolver {
    resolvedContractSources: ContractSource[];
    private readonly _resolver;
    constructor(resolver: Resolver);
    resolveIfExists(importPath: string): ContractSource | undefined;
}
//# sourceMappingURL=spy_resolver.d.ts.map