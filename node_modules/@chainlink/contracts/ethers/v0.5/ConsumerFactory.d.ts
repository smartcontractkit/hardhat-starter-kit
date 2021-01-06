import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Consumer } from "./Consumer";
export declare class ConsumerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<Consumer>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Consumer;
    connect(signer: Signer): ConsumerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Consumer;
}
//# sourceMappingURL=ConsumerFactory.d.ts.map