import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { MaliciousChainlinked } from "./MaliciousChainlinked";
export declare class MaliciousChainlinkedFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<MaliciousChainlinked>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): MaliciousChainlinked;
    connect(signer: Signer): MaliciousChainlinkedFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): MaliciousChainlinked;
}
//# sourceMappingURL=MaliciousChainlinkedFactory.d.ts.map