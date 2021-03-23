
const { expect } = require("chai")


describe("PriceConsumer", async function () {
  //Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  let mockPriceFeed, priceConsumerV3, price, PriceConsumerV3, MockV3Aggregator

  beforeEach(async () => {
    // cant do anything in the above describe, don't try it!
    MockV3Aggregator = await ethers.getContractFactory("MockV3Aggregator")
    PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3")
    price = '200000000000000000000'
    mockPriceFeed = await MockV3Aggregator.deploy(18, price)
    priceConsumerV3 = await PriceConsumerV3.deploy(mockPriceFeed.address)
  })
  it("should return a positive value", async () => {
    let latestPrice = await priceConsumerV3.getLatestPrice()
    expect(latestPrice).to.equal(price)
  })
})
