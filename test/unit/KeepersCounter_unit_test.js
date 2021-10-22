const { expect } = require('chai')
const chai = require('chai')
const BN = require('bn.js')
const skipIf = require('mocha-skip-if')
chai.use(require('chai-bn')(BN))
const { deployments, getChainId } = require('hardhat')
const { networkConfig, developmentChains } = require('../../helper-hardhat-config')

skip.if(!developmentChains.includes(network.name)).
  describe('Keepers Counter Unit Tests', async function () {


    beforeEach(async () => {
      await deployments.fixture(['mocks', 'keepers'])
      const Counter = await deployments.get("Counter")
      counter = await ethers.getContractAt("Counter", Counter.address)
    })

    it('should be able to call checkUpkeep', async () => {
      const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""));
      const { upkeepNeeded, performData } = await counter.checkUpkeep(checkData);
    })

    it('should be able to call performUpkeep', async () => {
        const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""));
        await counter.performUpkeep(checkData);
        //now get the new counter value
        const result = await counter.counter()
        console.log("Keepers Counter value: ", new ethers.BigNumber.from(result._hex).toString())
        expect(new ethers.BigNumber.from(result).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
      })
  })
