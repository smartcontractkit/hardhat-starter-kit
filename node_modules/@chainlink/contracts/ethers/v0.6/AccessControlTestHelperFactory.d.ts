import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { AccessControlTestHelper } from "./AccessControlTestHelper";
export declare class AccessControlTestHelperFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_value: BigNumberish, overrides?: TransactionOverrides): Promise<AccessControlTestHelper>;
    getDeployTransaction(_value: BigNumberish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): AccessControlTestHelper;
    connect(signer: Signer): AccessControlTestHelperFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): AccessControlTestHelper;
}
//# sourceMappingURL=AccessControlTestHelperFactory.d.ts.map