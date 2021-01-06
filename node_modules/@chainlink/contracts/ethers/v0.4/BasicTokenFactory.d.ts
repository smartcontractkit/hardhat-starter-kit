import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { BasicToken } from "./BasicToken";
export declare class BasicTokenFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<BasicToken>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): BasicToken;
    connect(signer: Signer): BasicTokenFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): BasicToken;
}
//# sourceMappingURL=BasicTokenFactory.d.ts.map