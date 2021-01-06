import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Coordinator } from "./Coordinator";
export declare class CoordinatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, overrides?: TransactionOverrides): Promise<Coordinator>;
    getDeployTransaction(_link: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Coordinator;
    connect(signer: Signer): CoordinatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Coordinator;
}
//# sourceMappingURL=CoordinatorFactory.d.ts.map