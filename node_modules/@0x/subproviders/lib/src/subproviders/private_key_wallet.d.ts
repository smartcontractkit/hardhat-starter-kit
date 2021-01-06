import { EIP712TypedData } from '@0x/types';
import { PartialTxParams } from '../types';
import { BaseWalletSubprovider } from './base_wallet_subprovider';
/**
 * This class implements the [web3-provider-engine](https://github.com/MetaMask/provider-engine) subprovider interface.
 * This subprovider intercepts all account related RPC requests (e.g message/transaction signing, etc...) and handles
 * all requests with the supplied Ethereum private key.
 */
export declare class PrivateKeyWalletSubprovider extends BaseWalletSubprovider {
    private readonly _address;
    private readonly _privateKeyBuffer;
    /**
     * Instantiates a PrivateKeyWalletSubprovider.
     * @param privateKey The corresponding private key to an Ethereum address
     * @return PrivateKeyWalletSubprovider instance
     */
    constructor(privateKey: string);
    /**
     * Retrieve the account associated with the supplied private key.
     * This method is implicitly called when issuing a `eth_accounts` JSON RPC request
     * via your providerEngine instance.
     * @return An array of accounts
     */
    getAccountsAsync(): Promise<string[]>;
    /**
     * Sign a transaction with the private key. If you've added this Subprovider to your
     * app's provider, you can simply send an `eth_sendTransaction` JSON RPC request, and
     * this method will be called auto-magically. If you are not using this via a ProviderEngine
     * instance, you can call it directly.
     * @param txParams Parameters of the transaction to sign
     * @return Signed transaction hex string
     */
    signTransactionAsync(txParams: PartialTxParams): Promise<string>;
    /**
     * Sign a personal Ethereum signed message. The signing address will be calculated from the private key.
     * The address must be provided it must match the address calculated from the private key.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_sign`
     * or `personal_sign` JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param data Hex string message to sign
     * @param address Address of the account to sign with
     * @return Signature hex string (order: rsv)
     */
    signPersonalMessageAsync(data: string, address: string): Promise<string>;
    /**
     * Sign an EIP712 Typed Data message. The signing address will be calculated from the private key.
     * The address must be provided it must match the address calculated from the private key.
     * If you've added this Subprovider to your app's provider, you can simply send an `eth_signTypedData`
     * JSON RPC request, and this method will be called auto-magically.
     * If you are not using this via a ProviderEngine instance, you can call it directly.
     * @param address Address of the account to sign with
     * @param data the typed data object
     * @return Signature hex string (order: rsv)
     */
    signTypedDataAsync(address: string, typedData: EIP712TypedData): Promise<string>;
}
//# sourceMappingURL=private_key_wallet.d.ts.map