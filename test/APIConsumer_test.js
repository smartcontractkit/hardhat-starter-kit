const { expect } = require('chai')

describe('APIConsumer', async function () {
  let apiConsumer, mockOracle, linkToken

  beforeEach(async () => {
    await deployments.fixture(['mocks', 'api'])

    // Then, we can get the contracts like normal
    const LinkToken = await deployments.get('LinkToken')
    linkToken = await ethers.getContractAt('LinkToken', LinkToken.address)
    const APIConsumer = await deployments.get('APIConsumer')
    apiConsumer = await ethers.getContractAt('APIConsumer', APIConsumer.address)
    const MockOracle = await deployments.get('MockOracle')
    mockOracle = await ethers.getContractAt('MockOracle', MockOracle.address)
  })

  it('Should successfully make an external API request', async () => {
    const expected = '777'
    await linkToken.transfer(apiConsumer.address, '2000000000000000000')
    const transaction = await apiConsumer.requestVolumeData()
    const tx_receipt = await transaction.wait()
    const requestId = tx_receipt.events[0].topics[1]
    const returnData = web3.utils.padLeft(web3.utils.padLeft(web3.utils.toHex(expected)), 64)
    const tx = await mockOracle.fulfillOracleRequest(requestId, returnData)
    await tx.wait()
    expect(await apiConsumer.volume()).to.equal(expected)
  })
})
