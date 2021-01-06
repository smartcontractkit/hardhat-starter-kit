import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { Arrayish, BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { Aggregator } from "./Aggregator";
export declare class AggregatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, _paymentAmount: BigNumberish, _minimumResponses: BigNumberish, _oracles: string[], _jobIds: Arrayish[], overrides?: TransactionOverrides): Promise<Aggregator>;
    getDeployTransaction(_link: string, _paymentAmount: BigNumberish, _minimumResponses: BigNumberish, _oracles: string[], _jobIds: Arrayish[], overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Aggregator;
    connect(signer: Signer): AggregatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Aggregator;
}
//# sourceMappingURL=AggregatorFactory.d.ts.map