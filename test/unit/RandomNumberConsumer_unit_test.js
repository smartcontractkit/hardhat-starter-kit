const { networkConfig, autoFundCheck, developmentChains } = require('../../helper-hardhat-config')
const skipIf = require('mocha-skip-if')
const chai = require('chai')
const { expect } = require('chai')
const BN = require('bn.js')
chai.use(require('chai-bn')(BN))


skip.if(!developmentChains.includes(network.name)).
  describe('RandomNumberConsumer Unit Tests', async function () {

    let randomNumberConsumer

    beforeEach(async () => {
      const chainId = await getChainId()
      await deployments.fixture(['mocks', 'vrf'])
      const LinkToken = await deployments.get('LinkToken')
      linkToken = await ethers.getContractAt('LinkToken', LinkToken.address)
      const networkName = networkConfig[chainId]['name']

      linkTokenAddress = linkToken.address
      additionalMessage = " --linkaddress " + linkTokenAddress

      const RandomNumberConsumer = await deployments.get('RandomNumberConsumer')
      randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address)

      if (await autoFundCheck(randomNumberConsumer.address, networkName, linkTokenAddress, additionalMessage)) {
        await hre.run("fund-link", { contract: randomNumberConsumer.address, linkaddress: linkTokenAddress })
      }
    })

    it('Should successfully make an external random number request', async () => {
      const transaction = await randomNumberConsumer.getRandomNumber()
      const tx_receipt = await transaction.wait(1)
      const requestId = tx_receipt.events[2].topics[1]

      console.log("requestId: ", requestId)
      expect(requestId).to.not.be.null
    })
  })
