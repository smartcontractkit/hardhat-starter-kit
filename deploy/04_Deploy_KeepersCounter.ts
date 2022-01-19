import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig } from "../helper-hardhat-config"

const deployFunction: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getChainId } = hre

  const { deploy, log } = deployments

  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  const keepersUpdateInterval = networkConfig[chainId].keepersUpdateInterval

  const keepersCounter = await deploy("KeepersCounter", {
    from: deployer,
    args: [keepersUpdateInterval],
    log: true,
  })

  log(
    `Head to https://keepers.chain.link/ to register your contract for upkeeps. Then run the following command to track the counter updates`,
  )
  log(`npx hardhat read-keepers-counter --contract ${keepersCounter.address} --network ${networkConfig[chainId].name}`)
  log(`----------------------------------------------------`)
}

export default deployFunction
deployFunction.tags = [`all`, `keepers`]
