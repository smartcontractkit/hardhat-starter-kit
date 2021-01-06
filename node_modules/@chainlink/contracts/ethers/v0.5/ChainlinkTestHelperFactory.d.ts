import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { ChainlinkTestHelper } from "./ChainlinkTestHelper";
export declare class ChainlinkTestHelperFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<ChainlinkTestHelper>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): ChainlinkTestHelper;
    connect(signer: Signer): ChainlinkTestHelperFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): ChainlinkTestHelper;
}
//# sourceMappingURL=ChainlinkTestHelperFactory.d.ts.map