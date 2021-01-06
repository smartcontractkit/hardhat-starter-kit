import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { MedianTestHelper } from "./MedianTestHelper";
export declare class MedianTestHelperFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<MedianTestHelper>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): MedianTestHelper;
    connect(signer: Signer): MedianTestHelperFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): MedianTestHelper;
}
//# sourceMappingURL=MedianTestHelperFactory.d.ts.map