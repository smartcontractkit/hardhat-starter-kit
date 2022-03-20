import { DeployFunction } from "hardhat-deploy/types"
import { network } from "hardhat"
import {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config"
import { verify } from "../helper-functions"

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments, getChainId }) => {
  const { deploy, log } = deployments

  const { deployer } = await getNamedAccounts()
  const chainId: number | undefined = network.config.chainId
  if (!chainId) return

  const keepersUpdateInterval: string = networkConfig[chainId].keepersUpdateInterval || "30"

  const waitBlockConfirmations: number = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS
  const args = [keepersUpdateInterval]
  const keepersCounter = await deploy("KeepersCounter", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(keepersCounter.address, args)
  }

  log(
    "Head to https://keepers.chain.link/ to register your contract for upkeeps. Then run the following command to track the counter updates: "
  )
  const networkName = network.name == "hardhat" ? "localhost" : network.name
  log(
    `yarn hardhat read-keepers-counter --contract ${keepersCounter.address} --network ${networkName}`
  )
  log("----------------------------------------------------")
}

export default deployFunction
deployFunction.tags = [`all`, `keepers`]
