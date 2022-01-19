import { DeployFunction } from "hardhat-deploy/types"
import { HardhatRuntimeEnvironment } from "hardhat/types"
import { networkConfig } from "../helper-hardhat-config"

const deployFunction: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
  const { deployments, getNamedAccounts, getChainId } = hre
  const { deploy, get, log } = deployments

  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()

  let linkTokenAddress: string | undefined
  let vrfCoordinatorAddress: string | undefined
  let additionalMessage: string = ``

  if (chainId === `31337`) {
    const linkToken = await get("LinkToken")
    const VRFCoordinatorMock = await get("VRFCoordinatorMock")
    linkTokenAddress = linkToken.address
    vrfCoordinatorAddress = VRFCoordinatorMock.address
    additionalMessage = ` --linkaddress ${linkTokenAddress}`
  } else {
    linkTokenAddress = networkConfig[chainId].linkToken
    vrfCoordinatorAddress = networkConfig[chainId].vrfCoordinator
  }

  const keyHash = networkConfig[chainId].keyHash
  const fee = networkConfig[chainId].fee

  const randomNumberConsumer = await deploy("RandomNumberConsumer", {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee],
    log: true,
  })

  log(`Run the following command to fund contract with LINK:`)
  log(
    `npx hardhat fund-link --contract ${randomNumberConsumer.address} --network ${networkConfig[chainId].name} ${additionalMessage}`,
  )
  log(`Then run RandomNumberConsumer contract with the following command`)
  log(`npx hardhat request-random-number --contract ${randomNumberConsumer.address} --network ${networkConfig[chainId].name}`)
  log(`----------------------------------------------------`)
}

export default deployFunction
deployFunction.tags = [`all`, `vrf`]
