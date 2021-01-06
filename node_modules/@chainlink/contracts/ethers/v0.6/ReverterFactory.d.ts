import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Reverter } from "./Reverter";
export declare class ReverterFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<Reverter>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Reverter;
    connect(signer: Signer): ReverterFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Reverter;
}
//# sourceMappingURL=ReverterFactory.d.ts.map