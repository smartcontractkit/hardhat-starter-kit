import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { AccessControlledAggregator } from "./AccessControlledAggregator";
export declare class AccessControlledAggregatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, _paymentAmount: BigNumberish, _timeout: BigNumberish, _validator: string, _minSubmissionValue: BigNumberish, _maxSubmissionValue: BigNumberish, _decimals: BigNumberish, _description: string, overrides?: TransactionOverrides): Promise<AccessControlledAggregator>;
    getDeployTransaction(_link: string, _paymentAmount: BigNumberish, _timeout: BigNumberish, _validator: string, _minSubmissionValue: BigNumberish, _maxSubmissionValue: BigNumberish, _decimals: BigNumberish, _description: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): AccessControlledAggregator;
    connect(signer: Signer): AccessControlledAggregatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): AccessControlledAggregator;
}
//# sourceMappingURL=AccessControlledAggregatorFactory.d.ts.map