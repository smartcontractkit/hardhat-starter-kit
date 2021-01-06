import { ContractFactory, Signer } from "ethers";
import { Provider } from "ethers/providers";
import { UnsignedTransaction } from "ethers/utils/transaction";
import { TransactionOverrides } from ".";
import { ChainlinkClient } from "./ChainlinkClient";
export declare class ChainlinkClientFactory extends ContractFactory {
    constructor(signer?: Signer);
    deploy(overrides?: TransactionOverrides): Promise<ChainlinkClient>;
    getDeployTransaction(overrides?: TransactionOverrides): UnsignedTransaction;
    attach(address: string): ChainlinkClient;
    connect(signer: Signer): ChainlinkClientFactory;
    static connect(address: string, signerOrProvider: Signer | Provider): ChainlinkClient;
}
//# sourceMappingURL=ChainlinkClientFactory.d.ts.map