import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Flags } from "./Flags";
export declare class FlagsFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(racAddress: string, overrides?: TransactionOverrides): Promise<Flags>;
    getDeployTransaction(racAddress: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Flags;
    connect(signer: Signer): FlagsFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Flags;
}
//# sourceMappingURL=FlagsFactory.d.ts.map