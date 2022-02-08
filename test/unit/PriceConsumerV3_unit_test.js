const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("PriceConsumer Unit Tests", async function () {
      // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
      let priceConsumerV3, mockV3Aggregator

      beforeEach(async () => {
        await deployments.fixture(["mocks", "feed"])
        priceConsumerV3 = await ethers.getContract("PriceConsumerV3")
        mockV3Aggregator = await ethers.getContract("MockV3Aggregator")
      })

      describe("constructor", () => {
        it("sets the aggregator addresses correctly", async () => {
          const response = await priceConsumerV3.getPriceFeed()
          assert.equal(response, mockV3Aggregator.address)
        })
      })

      describe("getLatestPrice", () => {
        it("should return the same value as the mock", async () => {
          const priceConsumerResult = await priceConsumerV3.getLatestPrice()
          const priceFeedResult = (await mockV3Aggregator.latestRoundData()).answer
          assert.equal(priceConsumerResult.toString(), priceFeedResult.toString())
        })
      })
    })
