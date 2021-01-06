import { PartialTxParams, TrezorSubproviderConfig } from '../types';
import { BaseWalletSubprovider } from './base_wallet_subprovider';
export declare class TrezorSubprovider extends BaseWalletSubprovider {
    private readonly _privateKeyPath;
    private readonly _trezorConnectClientApi;
    private readonly _networkId;
    private readonly _addressSearchLimit;
    private _initialDerivedKeyInfo;
    /**
     * Instantiates a TrezorSubprovider. Defaults to private key path set to `44'/60'/0'/0/`.
     * Must be initialized with trezor-connect API module https://github.com/trezor/connect.
     * @param TrezorSubprovider config object containing trezor-connect API
     * @return TrezorSubprovider instance
     */
    constructor(config: TrezorSubproviderConfig);
    /**
     * Retrieve a users Trezor account. This method is automatically called
     * when issuing a `eth_accounts` JSON RPC request via your providerEngine
     * instance.
     * @return An array of accounts
     */
    getAccountsAsync(numberOfAccounts?: number): Promise<string[]>;
    /**
     * Signs a transaction on the Trezor with the account specificed by the `from` field in txParams.
     * If you've added the TrezorSubprovider to your app's provider, you can simply send an `eth_sendTransaction`
     * JSON RPC request, and this method will be called auto-magically. If you are not using this via a ProviderEngine
     * instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    signTransactionAsync(txData: PartialTxParams): Promise<string>;
    /**
     * Sign a personal Ethereum signed message. The signing account will be the account
     * associated with the provided address. If you've added the TrezorSubprovider to
     * your app's provider, you can simply send an `eth_sign` or `personal_sign` JSON RPC
     * request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    signPersonalMessageAsync(data: string, address: string): Promise<string>;
    /**
     * TODO:: eth_signTypedData is currently not supported on Trezor devices.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    signTypedDataAsync(address: string, typedData: any): Promise<string>;
    private _initialDerivedKeyInfoAsync;
    private _findDerivedKeyInfoForAddress;
}
//# sourceMappingURL=trezor.d.ts.map