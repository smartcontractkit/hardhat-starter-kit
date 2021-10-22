const chai = require('chai')
const { expect } = require('chai')
const BN = require('bn.js')
chai.use(require('chai-bn')(BN))
const skipIf = require('mocha-skip-if')
const { developmentChains } = require('../../helper-hardhat-config')

skip.if(developmentChains.includes(network.name)).
  describe('APIConsumer Integration Tests', async function () {

    let apiConsumer

    beforeEach(async () => {
      const APIConsumer = await deployments.get('APIConsumer')
      apiConsumer = await ethers.getContractAt('APIConsumer', APIConsumer.address)
    })

    it('Should successfully make an external API request and get a result', async () => {
      const transaction = await apiConsumer.requestVolumeData()
      const tx_receipt = await transaction.wait()
      const requestId = tx_receipt.events[0].topics[1]

      //wait 30 secs for oracle to callback
      await new Promise(resolve => setTimeout(resolve, 30000))

      //Now check the result
      const result = await apiConsumer.volume()
      console.log("API Consumer Volume: ", new ethers.BigNumber.from(result._hex).toString())
      expect(new ethers.BigNumber.from(result._hex).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
    })
  })
