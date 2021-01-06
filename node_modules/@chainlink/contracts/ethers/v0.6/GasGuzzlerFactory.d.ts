import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { GasGuzzler } from "./GasGuzzler";
export declare class GasGuzzlerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<GasGuzzler>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): GasGuzzler;
    connect(signer: Signer): GasGuzzlerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): GasGuzzler;
}
//# sourceMappingURL=GasGuzzlerFactory.d.ts.map