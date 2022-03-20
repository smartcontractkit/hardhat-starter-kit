import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments, network } from "hardhat"

const deployFunction: DeployFunction = async () => {
  const DECIMALS: string = `18`
  const INITIAL_PRICE: string = `200000000000000000000`
  const POINT_ONE_LINK: string = `100000000000000000`

  const { deploy, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId: number | undefined = network.config.chainId

  // If we are on a local development network, we need to deploy mocks!
  if (chainId === 31337) {
    log(`Local network detected! Deploying mocks...`)

    const linkToken = await deploy(`LinkToken`, { from: deployer, log: true })

    await deploy(`MockV3Aggregator`, {
      contract: `MockV3Aggregator`,
      from: deployer,
      log: true,
      args: [DECIMALS, INITIAL_PRICE],
    })

    await deploy("VRFCoordinatorV2Mock", {
      from: deployer,
      log: true,
      args: [
        POINT_ONE_LINK,
        1e9, // 0.000000001 LINK per gas
      ],
    })

    await deploy(`MockOracle`, {
      from: deployer,
      log: true,
      args: [linkToken.address],
    })

    log(`Mocks Deployed!`)
    log(`----------------------------------------------------`)
    log(`You are deploying to a local network, you'll need a local network running to interact`)
    log("Please run `yarn hardhat console` to interact with the deployed smart contracts!")
    log(`----------------------------------------------------`)
  }
}

export default deployFunction
deployFunction.tags = [`all`, `mocks`, `main`]
