import { JSONRPCRequestPayload } from 'ethereum-types';
import { Callback, ErrorCallback, PartialTxParams } from '../types';
import { Subprovider } from './subprovider';
export declare abstract class BaseWalletSubprovider extends Subprovider {
    protected static _validateTxParams(txParams: PartialTxParams): void;
    private static _validateSender;
    abstract getAccountsAsync(): Promise<string[]>;
    abstract signTransactionAsync(txParams: PartialTxParams): Promise<string>;
    abstract signPersonalMessageAsync(data: string, address: string): Promise<string>;
    abstract signTypedDataAsync(address: string, typedData: any): Promise<string>;
    /**
     * This method conforms to the web3-provider-engine interface.
     * It is called internally by the ProviderEngine when it is this subproviders
     * turn to handle a JSON RPC request.
     * @param payload JSON RPC payload
     * @param next Callback to call if this subprovider decides not to handle the request
     * @param end Callback to call if subprovider handled the request and wants to pass back the request.
     */
    handleRequest(payload: JSONRPCRequestPayload, next: Callback, end: ErrorCallback): Promise<void>;
    private _emitSendTransactionAsync;
    private _populateMissingTxParamsAsync;
}
//# sourceMappingURL=base_wallet_subprovider.d.ts.map