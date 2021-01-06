import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { ENSRegistry } from "./ENSRegistry";
export declare class ENSRegistryFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<ENSRegistry>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): ENSRegistry;
    connect(signer: Signer): ENSRegistryFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): ENSRegistry;
}
//# sourceMappingURL=ENSRegistryFactory.d.ts.map