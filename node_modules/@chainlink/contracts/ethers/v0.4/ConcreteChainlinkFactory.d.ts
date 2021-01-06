import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { ConcreteChainlink } from "./ConcreteChainlink";
export declare class ConcreteChainlinkFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<ConcreteChainlink>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): ConcreteChainlink;
    connect(signer: Signer): ConcreteChainlinkFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): ConcreteChainlink;
}
//# sourceMappingURL=ConcreteChainlinkFactory.d.ts.map