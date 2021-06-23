const { expect } = require('chai')

describe('RandomNumberConsumer', async function () {
  let randomNumberConsumer, vrfCoordinatorMock

  beforeEach(async () => {
    await deployments.fixture(['mocks', 'vrf'])

    const LinkToken = await deployments.get('LinkToken')
    linkToken = await ethers.getContractAt('LinkToken', LinkToken.address)
    const RandomNumberConsumer = await deployments.get('RandomNumberConsumer')
    randomNumberConsumer = await ethers.getContractAt('RandomNumberConsumer', RandomNumberConsumer.address)
    const VRFCoordinatorMock = await deployments.get('VRFCoordinatorMock')
    vrfCoordinatorMock = await ethers.getContractAt('VRFCoordinatorMock', VRFCoordinatorMock.address)
  })

  it('Should successfully make an external random number request', async () => {
    const expected = '777'
    await linkToken.transfer(randomNumberConsumer.address, '2000000000000000000')
    const transaction = await randomNumberConsumer.getRandomNumber()
    const tx_receipt = await transaction.wait()
    const requestId = tx_receipt.events[2].topics[0]

    // Test the result of the random number request
    await vrfCoordinatorMock.callBackWithRandomness(requestId, expected, randomNumberConsumer.address)
    expect(await randomNumberConsumer.randomResult()).to.equal(expected)
  })
})
