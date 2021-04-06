
const { expect } = require("chai")
const { expectRevert } = require('@openzeppelin/test-helpers')

describe("RandomNumberConsumer", async function () {
  let randomNumberConsumer, vrfCoordinatorMock, seed, link, keyhash, fee
  beforeEach(async () => {
    const LinkToken = await ethers.getContractFactory("LinkToken")
    const RandomNumberConsumer = await ethers.getContractFactory("RandomNumberConsumer")
    const VRFCoordinatorMock = await ethers.getContractFactory("VRFCoordinatorMock")
    keyhash = '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4'
    fee = '1000000000000000000'
    seed = 123
    link = await LinkToken.deploy()
    vrfCoordinatorMock = await VRFCoordinatorMock.deploy(link.address)
    randomNumberConsumer = await RandomNumberConsumer.deploy(vrfCoordinatorMock.address, link.address, keyhash, fee)
  })
  it("Random Number Should successfully make an external random number request", async () => {
    //Before we can do an API request, we need to fund it with LINK
    // await hre.run("fund-link", { contract: randomNumberConsumer.address, linkAddress: link.address })
    await link.transfer(randomNumberConsumer.address, '2000000000000000000')
    let transaction = await randomNumberConsumer.getRandomNumber(seed)
    let tx_receipt = await transaction.wait()
    let requestId = tx_receipt.events[2].topics[0]
    //Test the result of the random number request
    let tx = await vrfCoordinatorMock.callBackWithRandomness(requestId, '777', randomNumberConsumer.address)
    let randomNumber = await randomNumberConsumer.randomResult()
    console.log("Random Number: ", randomNumber)
    expect(randomNumber).to.equal(777)
  })
})
