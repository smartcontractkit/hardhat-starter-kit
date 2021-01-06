import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { PublicResolver } from "./PublicResolver";
export declare class PublicResolverFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(ensAddr: string, overrides?: TransactionOverrides): Promise<PublicResolver>;
    getDeployTransaction(ensAddr: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): PublicResolver;
    connect(signer: Signer): PublicResolverFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): PublicResolver;
}
//# sourceMappingURL=PublicResolverFactory.d.ts.map