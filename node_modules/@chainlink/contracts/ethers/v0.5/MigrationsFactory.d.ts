import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { Migrations } from "./Migrations";
export declare class MigrationsFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<Migrations>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): Migrations;
    connect(signer: Signer): MigrationsFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): Migrations;
}
//# sourceMappingURL=MigrationsFactory.d.ts.map