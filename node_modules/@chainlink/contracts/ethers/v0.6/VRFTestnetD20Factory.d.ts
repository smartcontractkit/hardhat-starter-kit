import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { Arrayish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { VRFTestnetD20 } from "./VRFTestnetD20";
export declare class VRFTestnetD20Factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_vrfCoordinator: string, _link: string, _keyHash: Arrayish, overrides?: TransactionOverrides): Promise<VRFTestnetD20>;
    getDeployTransaction(_vrfCoordinator: string, _link: string, _keyHash: Arrayish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): VRFTestnetD20;
    connect(signer: Signer): VRFTestnetD20Factory;
    static connect(address: string, signerOrProvider: Signer | Provider): VRFTestnetD20;
}
//# sourceMappingURL=VRFTestnetD20Factory.d.ts.map