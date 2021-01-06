import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { MaliciousChainlinkClient } from "./MaliciousChainlinkClient";
export declare class MaliciousChainlinkClientFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<MaliciousChainlinkClient>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): MaliciousChainlinkClient;
    connect(signer: Signer): MaliciousChainlinkClientFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): MaliciousChainlinkClient;
}
//# sourceMappingURL=MaliciousChainlinkClientFactory.d.ts.map