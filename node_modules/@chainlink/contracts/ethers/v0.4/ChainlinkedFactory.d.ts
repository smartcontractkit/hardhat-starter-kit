import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Chainlinked } from "./Chainlinked";
export declare class ChainlinkedFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<Chainlinked>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Chainlinked;
    connect(signer: Signer): ChainlinkedFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Chainlinked;
}
//# sourceMappingURL=ChainlinkedFactory.d.ts.map