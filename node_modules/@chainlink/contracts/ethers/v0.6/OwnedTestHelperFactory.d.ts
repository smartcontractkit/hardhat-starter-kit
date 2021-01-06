import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { OwnedTestHelper } from "./OwnedTestHelper";
export declare class OwnedTestHelperFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<OwnedTestHelper>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): OwnedTestHelper;
    connect(signer: Signer): OwnedTestHelperFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): OwnedTestHelper;
}
//# sourceMappingURL=OwnedTestHelperFactory.d.ts.map