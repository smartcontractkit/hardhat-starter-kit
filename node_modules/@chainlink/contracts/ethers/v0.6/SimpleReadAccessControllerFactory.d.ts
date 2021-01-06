import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { SimpleReadAccessController } from "./SimpleReadAccessController";
export declare class SimpleReadAccessControllerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<SimpleReadAccessController>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): SimpleReadAccessController;
    connect(signer: Signer): SimpleReadAccessControllerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): SimpleReadAccessController;
}
//# sourceMappingURL=SimpleReadAccessControllerFactory.d.ts.map