import { SupportedProvider, ZeroExProvider } from 'ethereum-types';
export declare const providerUtils: {
    /**
     * Starts the Web3ProviderEngine without excess block polling
     * @param providerEngine The Web3ProviderEngine
     */
    startProviderEngine(providerEngine: any): void;
    /**
     * Standardize the supported provider types into our internal provider interface
     * or throw if unsupported provider supplied.
     * @param supportedProvider Potentially supported provider instance
     * @return Provider that conforms of our internal provider interface
     */
    standardizeOrThrow(supportedProvider: SupportedProvider): ZeroExProvider;
    /**
     * Retrieve the chain ID from a supported provider.
     * @param supportedProvider A supported provider instance.
     * @return A promise that resolves to the chain ID of the network the provider
     * is connected to.
     */
    getChainIdAsync(supportedProvider: SupportedProvider): Promise<number>;
};
//# sourceMappingURL=provider_utils.d.ts.map