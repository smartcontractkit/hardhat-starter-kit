const chai = require('chai')
const { expect } = require('chai')
const skipIf = require('mocha-skip-if')
const BN = require('bn.js')
chai.use(require('chai-bn')(BN))
const { developmentChains } = require('../../helper-hardhat-config')

skip.if(developmentChains.includes(network.name)).
  describe('RandomNumberConsumer Integration Tests', async function () {

    let randomNumberConsumer

    beforeEach(async () => {
      const RandomNumberConsumer = await deployments.get('RandomNumberConsumer')
      randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address)
    })

    it('Should successfully make a VRF request and get a result', async () => {
      const transaction = await randomNumberConsumer.getRandomNumber()
      const tx_receipt = await transaction.wait()
      const requestId = tx_receipt.events[2].topics[1]

      //wait 60 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 60000))

      const result = await randomNumberConsumer.randomResult()
      console.log("VRF Result: ", new ethers.BigNumber.from(result._hex).toString())
      expect(new ethers.BigNumber.from(result._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
    })
  })
