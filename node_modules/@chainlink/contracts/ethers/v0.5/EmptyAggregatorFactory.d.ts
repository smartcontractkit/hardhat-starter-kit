import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { EmptyAggregator } from "./EmptyAggregator";
export declare class EmptyAggregatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<EmptyAggregator>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): EmptyAggregator;
    connect(signer: Signer): EmptyAggregatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): EmptyAggregator;
}
//# sourceMappingURL=EmptyAggregatorFactory.d.ts.map