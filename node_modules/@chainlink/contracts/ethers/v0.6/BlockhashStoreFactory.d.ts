import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { BlockhashStore } from "./BlockhashStore";
export declare class BlockhashStoreFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<BlockhashStore>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): BlockhashStore;
    connect(signer: Signer): BlockhashStoreFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): BlockhashStore;
}
//# sourceMappingURL=BlockhashStoreFactory.d.ts.map