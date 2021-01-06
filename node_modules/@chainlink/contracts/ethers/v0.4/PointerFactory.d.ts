import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Pointer } from "./Pointer";
export declare class PointerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_addr: string, overrides?: TransactionOverrides): Promise<Pointer>;
    getDeployTransaction(_addr: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Pointer;
    connect(signer: Signer): PointerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Pointer;
}
//# sourceMappingURL=PointerFactory.d.ts.map