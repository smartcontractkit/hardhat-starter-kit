import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { MeanAggregator } from "./MeanAggregator";
export declare class MeanAggregatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<MeanAggregator>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): MeanAggregator;
    connect(signer: Signer): MeanAggregatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): MeanAggregator;
}
//# sourceMappingURL=MeanAggregatorFactory.d.ts.map