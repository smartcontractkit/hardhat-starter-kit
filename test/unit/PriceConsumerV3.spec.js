const { expect } = require("chai")
const skip = require("mocha-skip-if")
const { deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

skip.if(!developmentChains.includes(network.name)).describe("PriceConsumer Unit Tests", async function () {
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  let priceConsumerV3
  let ethUsdPriceFeed

  beforeEach(async () => {
    await deployments.fixture(["mocks", "feed"])
    const PriceConsumerV3 = await deployments.get("PriceConsumerV3")
    priceConsumerV3 = await ethers.getContractAt("PriceConsumerV3", PriceConsumerV3.address)

    const EthUsdAggregator = await deployments.get("EthUsdAggregator")
    ethUsdPriceFeed = await ethers.getContractAt("MockV3Aggregator", EthUsdAggregator.address)
  })

  it("should return price from Aggregator", async () => {
    const latestRound = await ethUsdPriceFeed.latestRoundData()
    let result = await priceConsumerV3.getLatestPrice(ethUsdPriceFeed.address)
    expect(result).to.equal(latestRound.answer)

    // oracle trigger simulation
    const newPrice = ethers.BigNumber.from("300396000000")
    await ethUsdPriceFeed.updateAnswer(newPrice)

    result = await priceConsumerV3.getLatestPrice(ethUsdPriceFeed.address)
    expect(result).to.equal(newPrice)
  })
})
