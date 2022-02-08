const { getNamedAccounts, deployments, network } = require("hardhat")
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { autoFundCheck, verify } = require("../helper-functions")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, get, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  let linkTokenAddress
  let vrfCoordinatorAddress
  let additionalMessage = ""

  if (chainId == 31337) {
    linkToken = await get("LinkToken")
    VRFCoordinatorMock = await get("VRFCoordinatorMock")
    linkTokenAddress = linkToken.address
    vrfCoordinatorAddress = VRFCoordinatorMock.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]["linkToken"]
    vrfCoordinatorAddress = networkConfig[chainId]["vrfCoordinator"]
  }
  const keyHash = networkConfig[chainId]["keyHash"]
  const fee = networkConfig[chainId]["fee"]

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS
  const args = [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee]
  const randomNumberConsumer = await deploy("RandomNumberConsumer", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(randomNumberConsumer.address, args)
  }

  // Checking for funding...
  if (networkConfig.fundAmount > 0) {
    log("Funding with LINK...")
    if (
      await autoFundCheck(
        randomNumberConsumer.address,
        network.name,
        linkTokenAddress,
        additionalMessage
      )
    ) {
      await hre.run("fund-link", {
        contract: randomNumberConsumer.address,
        linkaddress: linkTokenAddress,
      })
    } else {
      log("Contract already has LINK!")
    }
  }
  log("Then run RandomNumberConsumer contract with the following command")
  log(
    `npx hardhat request-random-number --contract ${randomNumberConsumer.address} --network ${network.name}`
  )
  log("----------------------------------------------------")
}

module.exports.tags = ["all", "vrf"]
