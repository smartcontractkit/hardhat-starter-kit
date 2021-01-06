import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { AggregatorValidatorMock } from "./AggregatorValidatorMock";
export declare class AggregatorValidatorMockFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<AggregatorValidatorMock>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): AggregatorValidatorMock;
    connect(signer: Signer): AggregatorValidatorMockFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): AggregatorValidatorMock;
}
//# sourceMappingURL=AggregatorValidatorMockFactory.d.ts.map