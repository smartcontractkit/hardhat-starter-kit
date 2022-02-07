const { expect } = require("chai")
const skip = require("mocha-skip-if")
const { developmentChains } = require("../../helper-hardhat-config")

skip.if(developmentChains.includes(network.name)).describe("APIConsumer Integration Tests", async function () {
  let apiConsumer

  beforeEach(async () => {
    const APIConsumer = await deployments.get("APIConsumer")
    apiConsumer = await ethers.getContractAt("APIConsumer", APIConsumer.address)
  })

  afterEach(async () => {
    apiConsumer.removeAllListeners()
  })

  it("Should successfully make an external API request and get a result", (done) => {
    apiConsumer.once("ChainlinkFulfilled", async () => {
      const result = await apiConsumer.volume()
      console.log(`API Consumer Volume: ${result.toString()}`)
      expect(result.gt(ethers.constants.Zero)).to.equal(true)
      done()
    })

    apiConsumer.requestVolumeData()
  })
})
