import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { ConcreteSignedSafeMath } from "./ConcreteSignedSafeMath";
export declare class ConcreteSignedSafeMathFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<ConcreteSignedSafeMath>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): ConcreteSignedSafeMath;
    connect(signer: Signer): ConcreteSignedSafeMathFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): ConcreteSignedSafeMath;
}
//# sourceMappingURL=ConcreteSignedSafeMathFactory.d.ts.map