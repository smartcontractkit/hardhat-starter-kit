const { expect } = require("chai")
const skip = require("mocha-skip-if")
const { developmentChains } = require("../../helper-hardhat-config")

skip.if(developmentChains.includes(network.name)).describe("RandomNumberConsumer Integration Tests", async function () {
  let randomNumberConsumer

  beforeEach(async () => {
    const RandomNumberConsumer = await deployments.get("RandomNumberConsumer")
    randomNumberConsumer = await ethers.getContractAt("RandomNumberConsumer", RandomNumberConsumer.address)
  })

  afterEach(async () => {
    randomNumberConsumer.removeAllListeners()
  })

  it("Should successfully make a VRF request and get a result", (done) => {
    randomNumberConsumer.once("RandomnessFulfilled", async () => {
      const result = await randomNumberConsumer.randomResult()
      console.log(`VRF Result: ${result.toString()}`)
      expect(result.gt(ethers.constants.Zero)).to.equal(true)
      done()
    })

    randomNumberConsumer.getRandomNumber()
  })
})
