import { LatticeSubproviderConfig, PartialTxParams } from '../types';
import { BaseWalletSubprovider } from './base_wallet_subprovider';
export declare class LatticeSubprovider extends BaseWalletSubprovider {
    private readonly _latticeConnectClient;
    /**
     * Instantiates a LatticeSubprovider. Private key path is set to `44'/60'/0'/0/`.
     * This subprovider must be initialized with the GridPlus `eth-lattice-keyring` module as
     * the `config.latticeConnectClient` object: https://www.npmjs.com/package/eth-lattice-keyring
     */
    constructor(config: LatticeSubproviderConfig);
    /**
     * Fetches the current Lattice wallet Ethereum address at path `44'/60'/0'/0/0`. Only the 0-th index address
     * may be fetched, but the Lattice user may switch wallets on their device at any time, in which case this
     * function would return a new address (in the form of a 1-element string array).
     * @param numberOfAccounts number of accounts to fetch. Currently this is ignored in the connect client, as only one address may be fetched at a time
     * @return A one-element array of addresses representing the current Lattice wallet's Ethereum account.
     */
    getAccountsAsync(numberOfAccounts?: number): Promise<string[]>;
    /**
     * Signs a transaction from the account specified by the `from` field in txParams.
     * @param txParams Parameters of the transaction to sign.
     * @return Signed transaction hex string. This is a serialized `ethereum-tx` Transaction object.
     */
    signTransactionAsync(txData: PartialTxParams): Promise<string>;
    /**
     * Sign a personal Ethereum message from the account specified in the `address` param.
     * @param data Data to be signed. May be represented in hex or ASCII; this representation will be preserved.
     * @param address Address from which to sign. Must be the address at `m/44'/60'/0'/0/0` of the current wallet.
     * @return Signature hex string of form `0x{r}{s}{v}
     */
    signPersonalMessageAsync(data: string, address: string): Promise<string>;
    /**
     * Sign a typed data message from the account specified in the `address` param.
     * @param address Address from which to sign. Must be the address at `m/44'/60'/0'/0/0` of the current wallet.
     * @param typedData The data to be signed.
     * @return Signature hex string of form `0x{r}{s}{v}
     */
    signTypedDataAsync(address: string, typedData: any): Promise<string>;
}
//# sourceMappingURL=lattice.d.ts.map