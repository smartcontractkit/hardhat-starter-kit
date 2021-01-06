import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { VRFCoordinator } from "./VRFCoordinator";
export declare class VRFCoordinatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, _blockHashStore: string, overrides?: TransactionOverrides): Promise<VRFCoordinator>;
    getDeployTransaction(_link: string, _blockHashStore: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): VRFCoordinator;
    connect(signer: Signer): VRFCoordinatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): VRFCoordinator;
}
//# sourceMappingURL=VRFCoordinatorFactory.d.ts.map