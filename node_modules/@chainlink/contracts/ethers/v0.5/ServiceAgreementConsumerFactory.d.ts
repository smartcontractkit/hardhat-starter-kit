import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { Arrayish } from "ethers/utils";
import { TransactionOverrides } from ".";
import { ServiceAgreementConsumer } from "./ServiceAgreementConsumer";
export declare class ServiceAgreementConsumerFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(_link: string, _coordinator: string, _sAId: Arrayish, overrides?: TransactionOverrides): Promise<ServiceAgreementConsumer>;
    getDeployTransaction(_link: string, _coordinator: string, _sAId: Arrayish, overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): ServiceAgreementConsumer;
    connect(signer: Signer): ServiceAgreementConsumerFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): ServiceAgreementConsumer;
}
//# sourceMappingURL=ServiceAgreementConsumerFactory.d.ts.map