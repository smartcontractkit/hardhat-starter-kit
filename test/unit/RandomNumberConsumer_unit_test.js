const { networkConfig, autoFundCheck } = require('../../helper-hardhat-config')
const chai = require('chai')
const {expect} = require('chai')
const BN = require('bn.js')
chai.use(require('chai-bn')(BN))

describe('RandomNumberConsumer Unit Tests', async function () {

  let randomNumberConsumer, seed

  beforeEach(async () => {
    const chainId = await getChainId()
    await deployments.fixture(['mocks', 'vrf'])
    const LinkToken = await deployments.get('LinkToken')
    linkToken = await ethers.getContractAt('LinkToken', LinkToken.address)
    const networkName = networkConfig[chainId]['name']

    linkTokenAddress = linkToken.address
    additionalMessage = " --linkaddress " + linkTokenAddress

    // We always need to set a seed and set the RandomNumberConsumer contract
    seed = 123
    const RandomNumberConsumer = await deployments.get('RandomNumberConsumer')
    randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address)

    if (await autoFundCheck(randomNumberConsumer.address, networkName, linkTokenAddress, additionalMessage)) {
      await hre.run("fund-link",{contract: randomNumberConsumer.address, linkaddress: linkTokenAddress})
    }
  })

  it('Should successfully make an external random number request', async () => {
    const transaction = await randomNumberConsumer.getRandomNumber(seed)
    const tx_receipt = await transaction.wait()
    const requestId = tx_receipt.events[2].topics[1]

    console.log("requestId: ", requestId)
    expect(requestId).to.not.be.null
  })
})
