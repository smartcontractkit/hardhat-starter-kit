import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { FluxAggregatorTestHelper } from "./FluxAggregatorTestHelper";
export declare class FluxAggregatorTestHelperFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<FluxAggregatorTestHelper>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): FluxAggregatorTestHelper;
    connect(signer: Signer): FluxAggregatorTestHelperFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): FluxAggregatorTestHelper;
}
//# sourceMappingURL=FluxAggregatorTestHelperFactory.d.ts.map