import { ethers } from "hardhat"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { DeployFunction } from "hardhat-deploy/types"
import { networkConfig } from "../helper-hardhat-config"

const FUND_AMOUNT = "1000000000000000000000"

const deployFundMe: DeployFunction = async function(
    hre: HardhatRuntimeEnvironment
) {
    const { getNamedAccounts, deployments, network } = hre
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()


    log("----------------------------------------------------")

    if (
    //   !devNetwork.includes(network.name) &&
      process.env.ETHERSCAN_API_KEY
    ) {
      log("Verifying...")
    //   await verify(raffle.address, args)
    }
    log("----------------------------------------------------")
}

export default deployFundMe
deployFundMe.tags = ["all", "deploy"]
