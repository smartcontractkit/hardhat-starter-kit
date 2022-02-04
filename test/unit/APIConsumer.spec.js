const { networkConfig, autoFundCheck, developmentChains } = require('../../helper-hardhat-config')
const skipIf = require('mocha-skip-if')
const chai = require('chai')
const { expect } = require('chai')
const BN = require('bn.js')
const { getChainId } = require('hardhat')
const {numToBytes32} = require("@chainlink/test-helpers/dist/src/helpers");
chai.use(require('chai-bn')(BN))

skip.if(!developmentChains.includes(network.name)).
  describe('APIConsumer Unit Tests', async function () {

    let apiConsumer, linkToken, mockOracle

    beforeEach(async () => {
      const chainId = await getChainId()
      await deployments.fixture(['mocks', 'api'])
      const LinkToken = await deployments.get('LinkToken')
      linkToken = await ethers.getContractAt('LinkToken', LinkToken.address)
      const networkName = networkConfig[chainId]['name']

      linkTokenAddress = linkToken.address
      additionalMessage = " --linkaddress " + linkTokenAddress

      const APIConsumer = await deployments.get('APIConsumer')
      apiConsumer = await ethers.getContractAt('APIConsumer', APIConsumer.address)

      if (await autoFundCheck(apiConsumer.address, networkName, linkTokenAddress, additionalMessage)) {
        await hre.run("fund-link", { contract: apiConsumer.address, linkaddress: linkTokenAddress })
      }

      const MockOracle = await deployments.get("MockOracle");
      mockOracle = await ethers.getContractAt("MockOracle", MockOracle.address);
    })

    afterEach(async () => {
      mockOracle.removeAllListeners()
    })

    it('Should successfully make an API request', async () => {
      const transaction = await apiConsumer.requestVolumeData()
      const tx_receipt = await transaction.wait()
      const requestId = tx_receipt.events[0].topics[1]

      console.log("requestId: ", requestId)
      expect(requestId).to.not.be.null
    })

    it("Should successfully make an API request and get a result", (done) => {
      mockOracle.once("OracleRequest",
        async (_specId, _sender, requestId, _payment, _cbAddress, _callbackFuncId, expiration, _dataVersion, _data) => {
          console.log("OracleRequest:", requestId, _data);
          // Mock the fulfillment of the request
          const callbackValue = 1
          await mockOracle.fulfillOracleRequest(requestId, numToBytes32(callbackValue));
          // Now check the result
          const volume = await apiConsumer.volume()
          expect(volume).to.equal(ethers.BigNumber.from(callbackValue))
          done();
      });
      apiConsumer.requestVolumeData();
    });
  })
