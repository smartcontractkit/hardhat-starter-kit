import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Owned } from "./Owned";
export declare class OwnedFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<Owned>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Owned;
    connect(signer: Signer): OwnedFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Owned;
}
//# sourceMappingURL=OwnedFactory.d.ts.map