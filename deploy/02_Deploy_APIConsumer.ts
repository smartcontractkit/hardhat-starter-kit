import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig } from "../helper-hardhat-config"

const deployFunction: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getChainId } = hre

  const { deploy, log, get } = deployments

  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  let linkTokenAddress: string | undefined
  let oracle: string | undefined
  let additionalMessage: string = ``
  //set log level to ignore non errors
  hre.ethers.utils.Logger.setLogLevel(hre.ethers.utils.Logger.levels.ERROR)

  if (chainId === `31337`) {
    let linkToken = await get(`LinkToken`)
    let MockOracle = await get(`MockOracle`)
    linkTokenAddress = linkToken.address
    oracle = MockOracle.address
    additionalMessage = ` --linkaddress ${linkTokenAddress}`
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken
    oracle = networkConfig[chainId].oracle
  }

  const jobId = hre.ethers.utils.toUtf8Bytes(networkConfig[chainId].jobId!)
  const fee = networkConfig[chainId].fee
  const networkName = networkConfig[chainId].name

  const apiConsumer = await deploy(`APIConsumer`, {
    from: deployer,
    args: [oracle, jobId, fee, linkTokenAddress],
    log: true,
  })

  log(`Run API Consumer contract with following command:`)
  log(`npx hardhat request-data --contract ${apiConsumer.address} --network ${networkName}`)
  log(`----------------------------------------------------`)
}

export default deployFunction
deployFunction.tags = [`all`, `api`, `main`]
