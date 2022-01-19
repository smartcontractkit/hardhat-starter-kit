import { developmentChains } from "../../helper-hardhat-config"
import { deployments, network, ethers } from "hardhat"
import { APIConsumer } from "../../typechain"
import { expect } from "chai"
import { BigNumber, constants } from "ethers"

if (!developmentChains.includes(network.name)) {
  describe("APIConsumer Integration Tests", async function () {
    let apiConsumer: APIConsumer

    beforeEach(async () => {
      const APIConsumer = await deployments.get("APIConsumer")
      apiConsumer = (await ethers.getContractAt("APIConsumer", APIConsumer.address)) as APIConsumer
    })

    it("Should successfully make an external API request and get a result", async () => {
      await expect(apiConsumer.requestVolumeData()).to.emit(apiConsumer, "ChainlinkRequested")

      //wait 30 secs for oracle to callback
      await new Promise((resolve) => setTimeout(resolve, 30000))

      //Now check the result
      const result: BigNumber = await apiConsumer.volume()
      console.log(`API Consumer Volume: ${result.toString()}`)
      expect(result).to.be.gt(constants.Zero)
    })
  })
}
