import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { AggregatorProxy } from "./AggregatorProxy";
export declare class AggregatorProxyFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_aggregator: string, overrides?: TransactionOverrides): Promise<AggregatorProxy>;
    getDeployTransaction(_aggregator: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): AggregatorProxy;
    connect(signer: Signer): AggregatorProxyFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): AggregatorProxy;
}
//# sourceMappingURL=AggregatorProxyFactory.d.ts.map