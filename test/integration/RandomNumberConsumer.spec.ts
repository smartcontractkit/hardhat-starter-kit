import { developmentChains } from "../../helper-hardhat-config"
import { deployments, network, ethers } from "hardhat"
import { RandomNumberConsumer } from "../../typechain"
import { expect } from "chai"
import { BigNumber, constants } from "ethers"

if (!developmentChains.includes(network.name)) {
  describe("RandomNumberConsumer Integration Tests", async function () {
    let randomNumberConsumer: RandomNumberConsumer

    beforeEach(async () => {
      const RandomNumberConsumer = await deployments.get("RandomNumberConsumer")
      randomNumberConsumer = (await ethers.getContractAt(
        "RandomNumberConsumer",
        RandomNumberConsumer.address,
      )) as RandomNumberConsumer
    })

    it("Should successfully make a VRF request and get a result", async () => {
      await randomNumberConsumer.getRandomNumber()

      //wait 60 secs for oracle to callback
      await new Promise((resolve) => setTimeout(resolve, 60000))

      const result: BigNumber = await randomNumberConsumer.randomResult()
      console.log(`VRF Result: ${result}`)
      expect(result).to.be.gt(constants.Zero)
    })
  })
}
