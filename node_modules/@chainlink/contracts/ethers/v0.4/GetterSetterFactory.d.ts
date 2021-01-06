import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { GetterSetter } from "./GetterSetter";
export declare class GetterSetterFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<GetterSetter>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): GetterSetter;
    connect(signer: Signer): GetterSetterFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): GetterSetter;
}
//# sourceMappingURL=GetterSetterFactory.d.ts.map