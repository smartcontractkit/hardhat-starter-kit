import { assert } from "chai"
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import {
    RandomNumberDirectFundingConsumerV2,
    RandomNumberDirectFundingConsumerV2__factory,
} from "../../typechain"
import { BigNumber } from "ethers"

task(
    "read-random-number-direct-funding",
    "Reads the random number returned to a contract by Chainlink VRF Direct Funding method"
)
    .addParam("contract", "The address of the VRF contract that you want to read")
    .addOptionalParam("requestid", "Request id")
    .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
        const contractAddr: string = taskArgs.contract
        const requestId = taskArgs.requestid
        const networkId: string = hre.network.name

        console.log(`Reading data from VRF contract ${contractAddr} on network ${networkId}`)

        //Get signer information
        const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
        const signer: SignerWithAddress = accounts[0]

        const vrfConsumerContractV2: RandomNumberDirectFundingConsumerV2 =
            RandomNumberDirectFundingConsumerV2__factory.connect(contractAddr, signer)

        try {
            const chosentRequestId = requestId || (await vrfConsumerContractV2.lastRequestId())
            const { fulfilled, randomWords } = await vrfConsumerContractV2.getRequestStatus(
                chosentRequestId
            )

            assert(fulfilled === true, `requestId ${chosentRequestId} not fulfilled`)
            assert(randomWords.length > 0, "randomness not received")
            console.log(`Random Numbers are: ${randomWords.toString()}`)
        } catch (error) {
            if (["hardhat", "localhost", "ganache"].includes(hre.network.name)) {
                console.log(
                    "You'll have to manually update the value since you're on a local chain!"
                )
            } else {
                console.log(
                    `Open your contract in the block explorer and check in internal transactions if the callback has been made`
                )
            }
        }
    })
