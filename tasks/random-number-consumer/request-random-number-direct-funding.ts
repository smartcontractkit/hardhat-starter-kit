import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {
    RandomNumberDirectFundingConsumerV2,
    RandomNumberDirectFundingConsumerV2__factory,
} from "../../typechain"
import { ContractTransaction } from "ethers"

task(
    "request-random-number-direct-funding",
    "Requests a random number for a Chainlink VRF enabled smart contract using the Direct Funding method"
)
    .addParam("contract", "The address of the API Consumer contract that you want to call")
    .addParam(
        "callbackgaslimit",
        "The maximum amount of gas to pay for completing the callback VRF function"
    )
    .addParam(
        "requestconfirmations",
        "The number of block confirmations the VRF service will wait to respond"
    )
    .addParam("numwords", "The number of random numbers to request")
    .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
        const {
            contract: contractAddr,
            callbackgaslimit: callbackGasLimit,
            requestconfirmations: requestConfirmations,
            numwords: numWords,
        } = taskArgs
        const networkId: string = hre.network.name

        console.log(
            `Requesting a random number using VRF consumer contract ${contractAddr} on network ${networkId}`
        )

        //Get signer information
        const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
        const signer: SignerWithAddress = accounts[0]

        //Create connection to VRF Contract and call the getRandomNumber function
        const vrfConsumerContractV2: RandomNumberDirectFundingConsumerV2 =
            RandomNumberDirectFundingConsumerV2__factory.connect(contractAddr, signer)

        const tx: ContractTransaction = await vrfConsumerContractV2.requestRandomWords(
            callbackGasLimit,
            requestConfirmations,
            numWords,
            {
                gasLimit: 1000000,
            }
        )
        await tx.wait()
        const requestId = await vrfConsumerContractV2.lastRequestId()

        console.log(
            "Contract ",
            contractAddr,
            " random number request successfully called. Transaction Hash: ",
            tx.hash,
            " requestId: ",
            requestId.toString()
        )
        console.log("Run the following to read the returned random number:")
        console.log(
            "yarn hardhat read-random-number-direct-funding --contract " +
                contractAddr +
                " --requestid " +
                requestId.toString() +
                " --network " +
                hre.network.name
        )
    })
