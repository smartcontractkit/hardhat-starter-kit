import { DeployFunction } from "hardhat-deploy/types"
import { ethers, network } from "hardhat"
import {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config"
import { verify } from "../helper-functions"
import { BigNumber, ContractReceipt, ContractTransaction } from "ethers"
import { VRFCoordinatorV2Mock } from "../typechain"

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get, log } = deployments

  const { deployer } = await getNamedAccounts()
  const chainId: number | undefined = network.config.chainId
  if (!chainId) return

  let linkTokenAddress: string | undefined
  let vrfCoordinatorAddress: string | undefined
  let subscriptionId: BigNumber

  if (chainId === 31337) {
    const linkToken = await get("LinkToken")
    const VRFCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract(
      "VRFCoordinatorV2Mock"
    )

    vrfCoordinatorAddress = VRFCoordinatorV2Mock.address
    linkTokenAddress = linkToken.address

    const fundAmount: BigNumber = networkConfig[chainId].fundAmount
    const transaction: ContractTransaction = await VRFCoordinatorV2Mock.createSubscription()
    const transactionReceipt: ContractReceipt = await transaction.wait(1)
    if (!transactionReceipt.events) return
    subscriptionId = ethers.BigNumber.from(transactionReceipt.events[0].topics[1])
    await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, fundAmount)
  } else {
    subscriptionId = BigNumber.from(process.env.VRF_SUBSCRIPTION_ID)
    linkTokenAddress = networkConfig[chainId].linkToken
    vrfCoordinatorAddress = networkConfig[chainId].vrfCoordinator
  }

  const keyHash: string | undefined = networkConfig[chainId].keyHash
  const waitBlockConfirmations: number = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS

  const args = [subscriptionId, vrfCoordinatorAddress, linkTokenAddress, keyHash]
  const randomNumberConsumerV2 = await deploy("RandomNumberConsumerV2", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(randomNumberConsumerV2.address, args)
  }

  log("Run RandomNumberConsumer contract with the following command")
  const networkName = network.name == "hardhat" ? "localhost" : network.name
  log(
    `yarn hardhat request-random-number --contract ${randomNumberConsumerV2.address} --network ${networkName}`
  )
  log("----------------------------------------------------")
}

export default deployFunction
deployFunction.tags = [`all`, `vrf`]
