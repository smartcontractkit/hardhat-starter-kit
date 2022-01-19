import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"

const deployFunction: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getChainId } = hre

  const DECIMALS: string = `18`
  const INITIAL_PRICE: string = `200000000000000000000`

  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId: string = await getChainId()

  // If we are on a local development network, we need to deploy mocks!
  if (chainId === `31337`) {
    log(`Local network detected! Deploying mocks...`)

    const linkToken = await deploy(`LinkToken`, { from: deployer, log: true })

    await deploy(`EthUsdAggregator`, {
      contract: `MockV3Aggregator`,
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    })

    await deploy(`VRFCoordinatorMock`, {
      from: deployer,
      log: true,
      args: [linkToken.address],
    })

    await deploy(`MockOracle`, {
      from: deployer,
      log: true,
      args: [linkToken.address],
    })

    log(`Mocks Deployed!`)
    log(`----------------------------------------------------`)
    log(`You are deploying to a local network, you'll need a local network running to interact`)
    log("Please run `npx hardhat console` to interact with the deployed smart contracts!")
    log(`----------------------------------------------------`)
  }
}

export default deployFunction
deployFunction.tags = [`all`, `mocks`, `main`]
