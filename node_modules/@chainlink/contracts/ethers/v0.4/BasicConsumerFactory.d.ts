import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { Arrayish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { BasicConsumer } from "./BasicConsumer";
export declare class BasicConsumerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, _oracle: string, _specId: Arrayish, overrides?: TransactionOverrides): Promise<BasicConsumer>;
    getDeployTransaction(_link: string, _oracle: string, _specId: Arrayish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): BasicConsumer;
    connect(signer: Signer): BasicConsumerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): BasicConsumer;
}
//# sourceMappingURL=BasicConsumerFactory.d.ts.map