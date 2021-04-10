
const { expect } = require("chai")
const { deployments, getChainId } = require("hardhat")
let { networkConfig } = require('../helper-hardhat-config')

describe("PriceConsumer", async function () {
  //Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  let priceConsumerV3, mockV3Aggregator

  beforeEach(async () => {
    // This runs the deploy script, and deploys everything in deploy!
    // We have it setup so that we don't deploy mocks
    // We ONLY deploy the fixtures on a localnet
    // If we want to deploy fixtures to a testnet, just run `hh deploy --network network`
    let chainId = await getChainId()
    if (chainId == 31337) {
      await deployments.fixture()
    }

    // Then, we can get the contracts that were just deployed
    PriceConsumerV3 = await deployments.get("PriceConsumerV3")
    priceConsumerV3 = await ethers.getContractAt("PriceConsumerV3", PriceConsumerV3.address)
    MockV3Aggregator = await deployments.get("MockV3Aggregator")
    mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator", MockV3Aggregator.address)
  })
  it("should return a positive value", async () => {
    let latestPrice = await priceConsumerV3.getLatestPrice()
    let mockLatestPrice = (await mockV3Aggregator.latestRoundData())[1]
    expect(latestPrice).to.equal(mockLatestPrice)
  })
})
