import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { FlagsTestHelper } from "./FlagsTestHelper";
export declare class FlagsTestHelperFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(flagsContract: string, overrides?: TransactionOverrides): Promise<FlagsTestHelper>;
    getDeployTransaction(flagsContract: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): FlagsTestHelper;
    connect(signer: Signer): FlagsTestHelperFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): FlagsTestHelper;
}
//# sourceMappingURL=FlagsTestHelperFactory.d.ts.map