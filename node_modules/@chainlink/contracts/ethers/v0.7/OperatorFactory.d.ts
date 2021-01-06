import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Operator } from "./Operator";
export declare class OperatorFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(link: string, overrides?: TransactionOverrides): Promise<Operator>;
    getDeployTransaction(link: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Operator;
    connect(signer: Signer): OperatorFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Operator;
}
//# sourceMappingURL=OperatorFactory.d.ts.map