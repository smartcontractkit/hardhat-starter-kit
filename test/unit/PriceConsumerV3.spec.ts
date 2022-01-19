import { expect } from "chai"
import { BigNumber, constants } from "ethers"
import { deployments, network, ethers } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { PriceConsumerV3 } from "../../typechain"

if (developmentChains.includes(network.name)) {
  describe("PriceConsumer Unit Tests", async function () {
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    let priceConsumerV3: PriceConsumerV3

    beforeEach(async () => {
      await deployments.fixture(["mocks", "feed"])
      const PriceConsumerV3 = await deployments.get("PriceConsumerV3")
      priceConsumerV3 = (await ethers.getContractAt("PriceConsumerV3", PriceConsumerV3.address)) as PriceConsumerV3
    })

    it("should return a positive value", async () => {
      const latestPrice: BigNumber = await priceConsumerV3.getLatestPrice()

      expect(latestPrice).to.be.gt(constants.Zero)
    })
  })
}
