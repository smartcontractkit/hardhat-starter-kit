import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { Arrayish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { GasGuzzlingConsumer } from "./GasGuzzlingConsumer";
export declare class GasGuzzlingConsumerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, _oracle: string, _specId: Arrayish, overrides?: TransactionOverrides): Promise<GasGuzzlingConsumer>;
    getDeployTransaction(_link: string, _oracle: string, _specId: Arrayish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): GasGuzzlingConsumer;
    connect(signer: Signer): GasGuzzlingConsumerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): GasGuzzlingConsumer;
}
//# sourceMappingURL=GasGuzzlingConsumerFactory.d.ts.map