const { getNamedAccounts, deployments, network } = require("hardhat")
const {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
} = require("../helper-hardhat-config")
const { autoFundCheck, verify } = require("../helper-functions")

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = network.config.chainId
  let linkTokenAddress
  let oracle
  let additionalMessage = ""
  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)

  if (chainId == 31337) {
    let linkToken = await get("LinkToken")
    let MockOracle = await get("MockOracle")
    linkTokenAddress = linkToken.address
    oracle = MockOracle.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]["linkToken"]
    oracle = networkConfig[chainId]["oracle"]
  }
  const jobId = ethers.utils.toUtf8Bytes(networkConfig[chainId]["jobId"])
  const fee = networkConfig[chainId]["fee"]

  const waitBlockConfirmations = developmentChains.includes(network.name)
    ? 1
    : VERIFICATION_BLOCK_CONFIRMATIONS
  const args = [oracle, jobId, fee, linkTokenAddress]
  const apiConsumer = await deploy("APIConsumer", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: waitBlockConfirmations,
  })

  if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
    log("Verifying...")
    await verify(apiConsumer.address, args)
  }

  // Checking for funding...
  if (networkConfig.fundAmount && networkConfig.fundAmount > 0) {
    log("Funding with LINK...")
    if (
      await autoFundCheck(apiConsumer.address, network.name, linkTokenAddress, additionalMessage)
    ) {
      await hre.run("fund-link", {
        contract: apiConsumer.address,
        linkaddress: linkTokenAddress,
      })
    } else {
      log("Contract already has LINK!")
    }
  }

  log("Run API Consumer contract with following command:")
  const networkName = network.name == "hardhat" ? "localhost" : network.name
  log(`yarn hardhat request-data --contract ${apiConsumer.address} --network ${networkName}`)
  log("----------------------------------------------------")
}
module.exports.tags = ["all", "api", "main"]
