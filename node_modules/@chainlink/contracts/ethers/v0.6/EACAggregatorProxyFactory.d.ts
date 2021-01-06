import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { EACAggregatorProxy } from "./EACAggregatorProxy";
export declare class EACAggregatorProxyFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_aggregator: string, _accessController: string, overrides?: TransactionOverrides): Promise<EACAggregatorProxy>;
    getDeployTransaction(_aggregator: string, _accessController: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): EACAggregatorProxy;
    connect(signer: Signer): EACAggregatorProxyFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): EACAggregatorProxy;
}
//# sourceMappingURL=EACAggregatorProxyFactory.d.ts.map