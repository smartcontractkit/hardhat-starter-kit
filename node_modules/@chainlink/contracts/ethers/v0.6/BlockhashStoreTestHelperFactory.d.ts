import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { BlockhashStoreTestHelper } from "./BlockhashStoreTestHelper";
export declare class BlockhashStoreTestHelperFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<BlockhashStoreTestHelper>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): BlockhashStoreTestHelper;
    connect(signer: Signer): BlockhashStoreTestHelperFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): BlockhashStoreTestHelper;
}
//# sourceMappingURL=BlockhashStoreTestHelperFactory.d.ts.map