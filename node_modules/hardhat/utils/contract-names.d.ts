/**
 * Returns a fully qualified name from a sourceName and contractName.
 */
export declare function getFullyQualifiedName(sourceName: string, contractName: string): string;
/**
 * Returns true if a name is fully qualified, and not just a bare contract name.
 */
export declare function isFullyQualifiedName(name: string): boolean;
/**
 * Parses a fully qualified name.
 *
 * @param fullyQualifiedName It MUST be a fully qualified name.
 */
export declare function parseFullyQualifiedName(fullyQualifiedName: string): {
    sourceName: string;
    contractName: string;
};
/**
 * Parses a name, which can be a bare contract name, or a fully qualified name.
 */
export declare function parseName(name: string): {
    sourceName?: string;
    contractName: string;
};
//# sourceMappingURL=contract-names.d.ts.map