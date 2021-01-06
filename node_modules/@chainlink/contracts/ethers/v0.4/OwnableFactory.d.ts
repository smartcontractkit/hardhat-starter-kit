import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Ownable } from "./Ownable";
export declare class OwnableFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<Ownable>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Ownable;
    connect(signer: Signer): OwnableFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Ownable;
}
//# sourceMappingURL=OwnableFactory.d.ts.map