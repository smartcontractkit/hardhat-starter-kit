
const { expect } = require("chai")
const { expectRevert } = require('@openzeppelin/test-helpers')

describe("RandomNumberConsumer", async function () {
  let randomNumberConsumer, vrfCoordinatorMock, seed
  beforeEach(async () => {
    // This runs everything in the deploy folder, and deploys everything in deploy!
    await deployments.fixture()
    // Then, we can get the contracts that were just deployed
    seed = 123
    let LinkToken = await deployments.get("LinkToken")
    linkToken = await ethers.getContractAt("LinkToken", LinkToken.address)
    let RandomNumberConsumer = await deployments.get("RandomNumberConsumer")
    randomNumberConsumer = await ethers.getContractAt("RandomNumberConsumer", RandomNumberConsumer.address)
    let VRFCoordinatorMock = await deployments.get("VRFCoordinatorMock")
    vrfCoordinatorMock = await ethers.getContractAt("VRFCoordinatorMock", VRFCoordinatorMock.address)
  })
  it("Should successfully make an external random number request", async () => {
    let expected = '777'
    await linkToken.transfer(randomNumberConsumer.address, '2000000000000000000')
    let transaction = await randomNumberConsumer.getRandomNumber(seed)
    let tx_receipt = await transaction.wait()
    let requestId = tx_receipt.events[2].topics[0]
    // Test the result of the random number request
    let tx = await vrfCoordinatorMock.callBackWithRandomness(requestId, expected, randomNumberConsumer.address)
    let randomNumber = await randomNumberConsumer.randomResult()
    // console.log("Random Number: ", randomNumber.toString())
    expect(randomNumber).to.equal(expected)
  })
})
