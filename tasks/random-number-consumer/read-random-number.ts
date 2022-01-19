import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { RandomNumberConsumer, RandomNumberConsumer__factory } from "../../typechain"
import { BigNumber, constants } from "ethers"

task("read-random-number", "Reads the random number returned to a contract by Chainlink VRF")
  .addParam("contract", "The address of the VRF contract that you want to read")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const contractAddr: string = taskArgs.contract
    const networkId: string = hre.network.name

    console.log(`Reading data from VRF contract ${contractAddr} on network ${networkId}`)

    //Get signer information
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
    const signer: SignerWithAddress = accounts[0]

    const vrfConsumerContract: RandomNumberConsumer = RandomNumberConsumer__factory.connect(contractAddr, signer)

    const result: BigNumber = await vrfConsumerContract.randomResult()

    console.log(`Random Number is: ${result.toString()}`)

    if (result == constants.Zero && ["hardhat", "localhost", "ganache"].indexOf(hre.network.name) == 0) {
      console.log(`You'll either need to wait another minute, or fix something!`)
    }

    if (["hardhat", "localhost", "ganache"].indexOf(hre.network.name) >= 0) {
      console.log(`You'll have to manually update the value since you're on a local chain!`)
    }
  })
