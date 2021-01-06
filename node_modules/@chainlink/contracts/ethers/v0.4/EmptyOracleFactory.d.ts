import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { EmptyOracle } from "./EmptyOracle";
export declare class EmptyOracleFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<EmptyOracle>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): EmptyOracle;
    connect(signer: Signer): EmptyOracleFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): EmptyOracle;
}
//# sourceMappingURL=EmptyOracleFactory.d.ts.map