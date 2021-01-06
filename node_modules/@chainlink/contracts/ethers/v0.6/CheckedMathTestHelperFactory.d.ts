import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { CheckedMathTestHelper } from "./CheckedMathTestHelper";
export declare class CheckedMathTestHelperFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<CheckedMathTestHelper>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): CheckedMathTestHelper;
    connect(signer: Signer): CheckedMathTestHelperFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): CheckedMathTestHelper;
}
//# sourceMappingURL=CheckedMathTestHelperFactory.d.ts.map