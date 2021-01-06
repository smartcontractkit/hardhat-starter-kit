import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { SchnorrSECP256K1 } from "./SchnorrSECP256K1";
export declare class SchnorrSECP256K1Factory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<SchnorrSECP256K1>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): SchnorrSECP256K1;
    connect(signer: Signer): SchnorrSECP256K1Factory;
    static connect(address: string, signerOrProvider: Signer | Provider): SchnorrSECP256K1;
}
//# sourceMappingURL=SchnorrSECP256K1Factory.d.ts.map