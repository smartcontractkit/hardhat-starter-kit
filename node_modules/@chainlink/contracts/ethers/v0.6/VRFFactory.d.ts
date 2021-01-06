import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { VRF } from "./VRF";
export declare class VRFFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<VRF>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): VRF;
    connect(signer: Signer): VRFFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): VRF;
}
//# sourceMappingURL=VRFFactory.d.ts.map