export import Web3ProviderEngine = require('web3-provider-engine');
import { LedgerEthereumClient } from './types';
/**
 * A factory method for creating a LedgerEthereumClient usable in a browser context.
 * @return LedgerEthereumClient A browser client for the LedgerSubprovider
 */
export declare function ledgerEthereumBrowserClientFactoryAsync(): Promise<LedgerEthereumClient>;
export { prependSubprovider } from './utils/subprovider_utils';
export { EmptyWalletSubprovider } from './subproviders/empty_wallet_subprovider';
export { FakeGasEstimateSubprovider } from './subproviders/fake_gas_estimate_subprovider';
export { SignerSubprovider } from './subproviders/signer';
export { RedundantSubprovider } from './subproviders/redundant_subprovider';
export { LedgerSubprovider } from './subproviders/ledger';
export { RPCSubprovider } from './subproviders/rpc_subprovider';
export { GanacheSubprovider } from './subproviders/ganache';
export { Subprovider } from './subproviders/subprovider';
export { DebugPayloadRawTransactionAttributes, DebugPayload, DebugSubprovider, WithDebugPayload, } from './subproviders/debug_subprovider';
export { NonceTrackerSubprovider } from './subproviders/nonce_tracker';
export { PrivateKeyWalletSubprovider } from './subproviders/private_key_wallet';
export { MnemonicWalletSubprovider } from './subproviders/mnemonic_wallet';
export { MetamaskSubprovider } from './subproviders/metamask_subprovider';
export { TrezorSubprovider } from './subproviders/trezor';
export { Callback, ErrorCallback, NextCallback, LedgerCommunicationClient, LedgerEthereumClient, NonceSubproviderErrors, LedgerSubproviderConfigs, PartialTxParams, JSONRPCRequestPayloadWithMethod, ECSignatureString, AccountFetchingConfigs, LedgerEthereumClientFactoryAsync, OnNextCompleted, MnemonicWalletSubproviderConfigs, LedgerGetAddressResult, TrezorSubproviderConfig, } from './types';
export { ECSignature, EIP712Object, EIP712ObjectValue, EIP712TypedData, EIP712Types, EIP712Parameter } from '@0x/types';
export { JSONRPCRequestPayload, SupportedProvider, JSONRPCResponsePayload, JSONRPCResponseError, JSONRPCErrorCallback, Web3JsProvider, GanacheProvider, EIP1193Provider, ZeroExProvider, EIP1193Event, Web3JsV1Provider, Web3JsV2Provider, Web3JsV3Provider, } from 'ethereum-types';
//# sourceMappingURL=index.d.ts.map