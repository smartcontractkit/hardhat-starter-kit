const { expect } = require('chai')
const chai = require('chai')
const BN = require('bn.js')
const skipIf = require('mocha-skip-if')
chai.use(require('chai-bn')(BN))
const { deployments, getChainId } = require('hardhat')
const { networkConfig, developmentChains } = require('../../helper-hardhat-config')

skip.if(!developmentChains.includes(network.name)).
  describe('PriceConsumer Unit Tests', async function () {
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    let priceConsumerV3

    beforeEach(async () => {
      await deployments.fixture(['mocks', 'feed'])
      const PriceConsumerV3 = await deployments.get("PriceConsumerV3")
      priceConsumerV3 = await ethers.getContractAt("PriceConsumerV3", PriceConsumerV3.address)
    })

    it('should return a positive value', async () => {
      let result = await priceConsumerV3.getLatestPrice()
      console.log("Price Feed Value: ", new ethers.BigNumber.from(result._hex).toString())
      expect(new ethers.BigNumber.from(result._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
    })
  })
