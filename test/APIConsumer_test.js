
const { expect } = require("chai")

describe("APIConsumer", async function () {
  let apiConsumer, mockOracle, linkToken
  beforeEach(async () => {
    // This runs the deploy script, and deploys everything in deploy!
    // We have it setup so that we don't deploy mocks
    // We ONLY deploy the fixtures on a localnet
    // If we want to deploy fixtures to a testnet, just run `hh deploy --network network`
    let chainId = await getChainId()
    if (chainId == 31337) {
      await deployments.fixture()
    }
    // Then, we can get the contracts like normal
    let LinkToken = await deployments.get("LinkToken")
    linkToken = await ethers.getContractAt("LinkToken", LinkToken.address)
    let APIConsumer = await deployments.get("APIConsumer")
    apiConsumer = await ethers.getContractAt("APIConsumer", APIConsumer.address)
    let MockOracle = await deployments.get("MockOracle")
    mockOracle = await ethers.getContractAt("MockOracle", MockOracle.address)
  })
  it("Should successfully make an external API request", async () => {
    let expected = '777'
    await linkToken.transfer(apiConsumer.address, '2000000000000000000')
    let transaction = await apiConsumer.requestVolumeData()
    let tx_receipt = await transaction.wait()
    let requestId = tx_receipt.events[0].topics[1]
    let returnData = web3.utils.padLeft(web3.utils.padLeft(web3.utils.toHex(expected)), 64)
    let tx = await mockOracle.fulfillOracleRequest(requestId, returnData)
    await tx.wait()
    let result = await apiConsumer.volume()
    // console.log("Result: ", result.toString())
    expect(result).to.equal(expected)
  })
})
