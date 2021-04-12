const { expect } = require('chai')
const { deployments, getChainId } = require('hardhat')
const { networkConfig } = require('../helper-hardhat-config')

describe('PriceConsumer', async function () {
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  let priceConsumerV3, mockV3Aggregator

  beforeEach(async () => {
    await deployments.fixture('feed')

    // Then, we can get the contracts that were just deployed
    PriceConsumerV3 = await deployments.get('PriceConsumerV3')
    priceConsumerV3 = await ethers.getContractAt('PriceConsumerV3', PriceConsumerV3.address)
    MockV3Aggregator = await deployments.get('EthUsdAggregator')
    mockV3Aggregator = await ethers.getContractAt('MockV3Aggregator', MockV3Aggregator.address)
  })

  it('should return a positive value', async () => {
    expect(await priceConsumerV3.getLatestPrice())
      .to.equal((await mockV3Aggregator.latestRoundData())[1])
  })
})
