import { providers, Signer } from 'ethers';
import { ContractJSON } from './ContractJSON';
export declare function deployContract(signer: Signer, contractJSON: ContractJSON, args?: any[], overrideOptions?: providers.TransactionRequest): Promise<import("ethers").Contract>;
