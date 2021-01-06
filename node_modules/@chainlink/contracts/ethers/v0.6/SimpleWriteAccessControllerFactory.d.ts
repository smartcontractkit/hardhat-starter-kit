import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { SimpleWriteAccessController } from "./SimpleWriteAccessController";
export declare class SimpleWriteAccessControllerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<SimpleWriteAccessController>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): SimpleWriteAccessController;
    connect(signer: Signer): SimpleWriteAccessControllerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): SimpleWriteAccessController;
}
//# sourceMappingURL=SimpleWriteAccessControllerFactory.d.ts.map