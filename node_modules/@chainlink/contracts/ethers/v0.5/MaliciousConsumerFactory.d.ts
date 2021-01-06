import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { MaliciousConsumer } from "./MaliciousConsumer";
export declare class MaliciousConsumerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, _oracle: string, overrides?: TransactionOverrides): Promise<MaliciousConsumer>;
    getDeployTransaction(_link: string, _oracle: string, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): MaliciousConsumer;
    connect(signer: Signer): MaliciousConsumerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): MaliciousConsumer;
}
//# sourceMappingURL=MaliciousConsumerFactory.d.ts.map