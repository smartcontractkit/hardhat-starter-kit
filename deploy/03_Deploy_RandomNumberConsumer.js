const { network } = require("hardhat")
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { verify } = require("../helper-functions")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  let vrfCoordinatorAddress
  let subscriptionId

  if (chainId == 31337) {
    VRFCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")

    vrfCoordinatorAddress = VRFCoordinatorV2Mock.address

    const fundAmount = networkConfig[chainId]["fundAmount"]
    const transaction = await VRFCoordinatorV2Mock.createSubscription()
    const transactionReceipt = await transaction.wait(1)
    subscriptionId = ethers.BigNumber.from(transactionReceipt.events[0].topics[1])
    await VRFCoordinatorV2Mock.fundSubscription(subscriptionId, fundAmount)
  } else {
    subscriptionId = process.env.VRF_SUBSCRIPTION_ID
    vrfCoordinatorAddress = networkConfig[chainId]["vrfCoordinator"]
  }
  const keyHash = networkConfig[chainId]["keyHash"]
  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS
  const args = [subscriptionId, vrfCoordinatorAddress, keyHash]
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

  log("Then run RandomNumberConsumer contract with the following command")
  const networkName = network.name == "hardhat" ? "localhost" : network.name
  log(
    `yarn hardhat request-random-number --contract ${randomNumberConsumerV2.address} --network ${networkName}`
  )
  log("----------------------------------------------------")
}

module.exports.tags = ["all", "vrf"]
