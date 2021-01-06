import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { DeviationFlaggingValidator } from "./DeviationFlaggingValidator";
export declare class DeviationFlaggingValidatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_flags: string, _flaggingThreshold: BigNumberish, overrides?: TransactionOverrides): Promise<DeviationFlaggingValidator>;
    getDeployTransaction(_flags: string, _flaggingThreshold: BigNumberish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): DeviationFlaggingValidator;
    connect(signer: Signer): DeviationFlaggingValidatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): DeviationFlaggingValidator;
}
//# sourceMappingURL=DeviationFlaggingValidatorFactory.d.ts.map