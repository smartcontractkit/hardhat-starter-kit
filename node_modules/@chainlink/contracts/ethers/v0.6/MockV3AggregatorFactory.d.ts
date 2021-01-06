import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { MockV3Aggregator } from "./MockV3Aggregator";
export declare class MockV3AggregatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_decimals: BigNumberish, _initialAnswer: BigNumberish, overrides?: TransactionOverrides): Promise<MockV3Aggregator>;
    getDeployTransaction(_decimals: BigNumberish, _initialAnswer: BigNumberish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): MockV3Aggregator;
    connect(signer: Signer): MockV3AggregatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): MockV3Aggregator;
}
//# sourceMappingURL=MockV3AggregatorFactory.d.ts.map