import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { BigNumberish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { AggregatorFacade } from "./AggregatorFacade";
export declare class AggregatorFacadeFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_aggregator: string, _decimals: BigNumberish, _description: string, overrides?: TransactionOverrides): Promise<AggregatorFacade>;
    getDeployTransaction(_aggregator: string, _decimals: BigNumberish, _description: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): AggregatorFacade;
    connect(signer: Signer): AggregatorFacadeFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): AggregatorFacade;
}
//# sourceMappingURL=AggregatorFacadeFactory.d.ts.map