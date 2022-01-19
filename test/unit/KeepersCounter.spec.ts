import { Block } from "@ethersproject/abstract-provider"
import { expect } from "chai"
import { BigNumber, constants } from "ethers"
import { deployments, network, ethers } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { KeepersCounter } from "../../typechain"

if (developmentChains.includes(network.name)) {
  describe("Keepers Counter Unit Tests", async function () {
    let counter: KeepersCounter

    beforeEach(async () => {
      await deployments.fixture(["mocks", "keepers"])
      const Counter = await deployments.get("KeepersCounter")
      counter = (await ethers.getContractAt("KeepersCounter", Counter.address)) as KeepersCounter
    })

    it("should be able to call checkUpkeep", async () => {
      const checkData: string = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))

      const blockNumber: number = await ethers.provider.getBlockNumber()
      const block: Block = await ethers.provider.getBlock(blockNumber)
      const lastTimestamp: BigNumber = await counter.lastTimeStamp()

      const [upkeepNeeded /*, performData*/] = await counter.checkUpkeep(checkData)

      const interval: BigNumber = await counter.interval()

      expect(upkeepNeeded).to.equal(BigNumber.from(block.timestamp).sub(lastTimestamp).gt(interval))
    })

    it("should be able to call performUpkeep", async () => {
      const previousCounterValue: BigNumber = await counter.counter()
      const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))

      await counter.performUpkeep(checkData)
      //now get the new counter value
      const currentCounterValue: BigNumber = await counter.counter()

      expect(currentCounterValue).to.equal(previousCounterValue.add(constants.One))
    })
  })
}
