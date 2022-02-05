const { networkConfig, autoFundCheck, developmentChains } = require("../../helper-hardhat-config")
const skip = require("mocha-skip-if")
const { expect } = require("chai")

skip.if(!developmentChains.includes(network.name)).describe("RandomNumberConsumer Unit Tests", async function () {
  let randomNumberConsumer
  let mockVrfCoordinator

  beforeEach(async () => {
    const chainId = await getChainId()
    await deployments.fixture(["mocks", "vrf"])
    const LinkToken = await deployments.get("LinkToken")
    linkToken = await ethers.getContractAt("LinkToken", LinkToken.address)
    const networkName = networkConfig[chainId]["name"]

    linkTokenAddress = linkToken.address
    additionalMessage = " --linkaddress " + linkTokenAddress

    const RandomNumberConsumer = await deployments.get("RandomNumberConsumer")
    randomNumberConsumer = await ethers.getContractAt("RandomNumberConsumer", RandomNumberConsumer.address)

    const MockVrfCoordinator = await deployments.get("VRFCoordinatorMock")
    mockVrfCoordinator = await ethers.getContractAt("VRFCoordinatorMock", MockVrfCoordinator.address)

    if (await autoFundCheck(randomNumberConsumer.address, networkName, linkTokenAddress, additionalMessage)) {
      await hre.run("fund-link", { contract: randomNumberConsumer.address, linkaddress: linkTokenAddress })
    }
  })

  it("Should successfully make an external random number request", async () => {
    const transaction = await randomNumberConsumer.getRandomNumber()
    const tx_receipt = await transaction.wait(1)
    const requestId = tx_receipt.events[2].topics[1]

    console.log("requestId: ", requestId)
    expect(requestId).to.not.be.null
  })

  it("Should get random number", async () => {
    const requestId = await randomNumberConsumer.callStatic.getRandomNumber()

    await expect(randomNumberConsumer.getRandomNumber()).to.emit(mockVrfCoordinator, "RandomnessRequest")

    // simulate callback from oracle
    const randomness = ethers.BigNumber.from("1000")
    await mockVrfCoordinator.callBackWithRandomness(requestId, randomness, randomNumberConsumer.address)

    const randomResult = await randomNumberConsumer.randomResult()
    expect(randomResult).to.equal(randomness)
  })
})
