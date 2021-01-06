import { EIP712TypedData } from '@0x/types';
import { MnemonicWalletSubproviderConfigs, PartialTxParams } from '../types';
import { BaseWalletSubprovider } from './base_wallet_subprovider';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * This subprovider intercepts all account related RPC requests (e.g message/transaction signing, etc...) and handles
 * all requests with accounts derived from the supplied mnemonic.
 */
export declare class MnemonicWalletSubprovider extends BaseWalletSubprovider {
    private readonly _addressSearchLimit;
    private _baseDerivationPath;
    private _derivedKeyInfo;
    private readonly _mnemonic;
    /**
     * Instantiates a MnemonicWalletSubprovider. Defaults to baseDerivationPath set to `44'/60'/0'/0`.
     * This is the default in TestRPC/Ganache, it can be overridden if desired.
     * @param config Configuration for the mnemonic wallet, must contain the mnemonic
     * @return MnemonicWalletSubprovider instance
     */
    constructor(config: MnemonicWalletSubproviderConfigs);
    /**
     * Retrieve the set derivation path
     * @returns derivation path
     */
    getPath(): string;
    /**
     * Set a desired derivation path when computing the available user addresses
     * @param baseDerivationPath The desired derivation path (e.g `44'/60'/0'`)
     */
    setPath(baseDerivationPath: string): void;
    /**
     * Retrieve the accounts associated with the mnemonic.
     * This method is implicitly called when issuing a `eth_accounts` JSON RPC request
     * via your providerEngine instance.
     * @param numberOfAccounts Number of accounts to retrieve (default: 10)
     * @return An array of accounts
     */
    getAccountsAsync(numberOfAccounts?: number): Promise<string[]>;
    /**
     * Signs a transaction with the account specificed by the `from` field in txParams.
     * If you've added this Subprovider to your  app's provider, you can simply send
     * an `eth_sendTransaction` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    signTransactionAsync(txParams: PartialTxParams): Promise<string>;
    /**
     * Sign a personal Ethereum signed message. The signing account will be the account
     * associated with the provided address. If you've added the MnemonicWalletSubprovider to
     * your app's provider, you can simply send an `eth_sign` or `personal_sign` JSON RPC request,
     * and this method will be called auto-magically. If you are not using this via a ProviderEngine
     * instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    signPersonalMessageAsync(data: string, address: string): Promise<string>;
    /**
     * Sign an EIP712 Typed Data message. The signing account will be the account
     * associated with the provided address. If you've added this MnemonicWalletSubprovider to
     * your app's provider, you can simply send an `eth_signTypedData` JSON RPC request, and
     * this method will be called auto-magically. If you are not using this via a ProviderEngine
     *  instance, you can call it directly.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    signTypedDataAsync(address: string, typedData: EIP712TypedData): Promise<string>;
    private _privateKeyWalletForAddress;
    private _findDerivedKeyInfoForAddress;
    private _initialDerivedKeyInfo;
}
//# sourceMappingURL=mnemonic_wallet.d.ts.map