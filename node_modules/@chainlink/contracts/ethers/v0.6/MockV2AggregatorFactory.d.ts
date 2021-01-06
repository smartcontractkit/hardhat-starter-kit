import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { MockV2Aggregator } from "./MockV2Aggregator";
export declare class MockV2AggregatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_initialAnswer: BigNumberish, overrides?: TransactionOverrides): Promise<MockV2Aggregator>;
    getDeployTransaction(_initialAnswer: BigNumberish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): MockV2Aggregator;
    connect(signer: Signer): MockV2AggregatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): MockV2Aggregator;
}
//# sourceMappingURL=MockV2AggregatorFactory.d.ts.map