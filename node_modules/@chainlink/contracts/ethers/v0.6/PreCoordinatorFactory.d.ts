import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { PreCoordinator } from "./PreCoordinator";
export declare class PreCoordinatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, overrides?: TransactionOverrides): Promise<PreCoordinator>;
    getDeployTransaction(_link: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): PreCoordinator;
    connect(signer: Signer): PreCoordinatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): PreCoordinator;
}
//# sourceMappingURL=PreCoordinatorFactory.d.ts.map