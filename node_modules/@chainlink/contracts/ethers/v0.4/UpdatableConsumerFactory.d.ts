import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { Arrayish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { UpdatableConsumer } from "./UpdatableConsumer";
export declare class UpdatableConsumerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_specId: Arrayish, _ens: string, _node: Arrayish, overrides?: TransactionOverrides): Promise<UpdatableConsumer>;
    getDeployTransaction(_specId: Arrayish, _ens: string, _node: Arrayish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): UpdatableConsumer;
    connect(signer: Signer): UpdatableConsumerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): UpdatableConsumer;
}
//# sourceMappingURL=UpdatableConsumerFactory.d.ts.map