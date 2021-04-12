const { expect } = require('chai')
const { deployments, getChainId } = require('hardhat')
const { networkConfig } = require('../helper-hardhat-config')

describe('PriceConsumer', async function () {
  // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
  let priceConsumerV3, ethUsdAggregator

  beforeEach(async () => {
    await deployments.fixture(['mocks', 'feed'])

    // Then, we can get the contracts that were just deployed
    const PriceConsumerV3 = await deployments.get('PriceConsumerV3')
    priceConsumerV3 = await ethers.getContractAt('PriceConsumerV3', PriceConsumerV3.address)
    const EthUsdAggregator = await deployments.get('EthUsdAggregator')
    ethUsdAggregator = await ethers.getContractAt('MockV3Aggregator', EthUsdAggregator.address)
  })

  it('should return a positive value', async () => {
    expect(await priceConsumerV3.getLatestPrice())
      .to.equal((await ethUsdAggregator.latestRoundData())[1])
  })
})
