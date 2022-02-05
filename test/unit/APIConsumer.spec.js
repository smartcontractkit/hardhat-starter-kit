const skip = require("mocha-skip-if")
const { networkConfig, autoFundCheck, developmentChains } = require("../../helper-hardhat-config")
const { expect } = require("chai")
const { getChainId } = require("hardhat")
const { numToBytes32 } = require("@chainlink/test-helpers/dist/src/helpers")

skip.if(!developmentChains.includes(network.name)).describe("APIConsumer Unit Tests", async function () {
  let apiConsumer, linkToken, mockOracle

  beforeEach(async () => {
    const chainId = await getChainId()
    await deployments.fixture(["mocks", "api"])
    const LinkToken = await deployments.get("LinkToken")
    linkToken = await ethers.getContractAt("LinkToken", LinkToken.address)
    const networkName = networkConfig[chainId]["name"]

    linkTokenAddress = linkToken.address
    additionalMessage = " --linkaddress " + linkTokenAddress

    const APIConsumer = await deployments.get("APIConsumer")
    apiConsumer = await ethers.getContractAt("APIConsumer", APIConsumer.address)

    if (await autoFundCheck(apiConsumer.address, networkName, linkTokenAddress, additionalMessage)) {
      await hre.run("fund-link", { contract: apiConsumer.address, linkaddress: linkTokenAddress })
    }

    const MockOracle = await deployments.get("MockOracle")
    mockOracle = await ethers.getContractAt("MockOracle", MockOracle.address)
  })

  it("Should successfully make an API request", async () => {
    const requestId = await apiConsumer.callStatic.requestVolumeData()

    await expect(apiConsumer.requestVolumeData()).to.emit(apiConsumer, "ChainlinkRequested")
    expect(requestId).to.not.be.null

    console.log(`Request id: ${requestId}`)
  })

  it("Should successfully make an API request and get a result", async () => {
    const requestId = await apiConsumer.callStatic.requestVolumeData()

    await expect(apiConsumer.requestVolumeData()).to.emit(mockOracle, "OracleRequest")

    // Mock the fulfillment of the request
    const callbackValue = 1
    await mockOracle.fulfillOracleRequest(requestId, numToBytes32(callbackValue))

    // Now check the result
    const volume = await apiConsumer.volume()
    expect(volume).to.equal(ethers.BigNumber.from(callbackValue))
  })
})
