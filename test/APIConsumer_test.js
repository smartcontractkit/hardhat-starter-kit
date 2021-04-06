
const { expect } = require("chai")

describe("APIConsumer", async function () {
  let apiConsumer, mockOracle, link, fee, jobId, url, path, times
  beforeEach(async () => {
    const LinkToken = await ethers.getContractFactory("LinkToken")
    const APIConsumer = await ethers.getContractFactory("APIConsumer")
    const MockOracle = await ethers.getContractFactory("MockOracle")
    jobId = web3.utils.toHex('4c7b7ffb66b344fbaa64995af81e355a')
    fee = '1000000000000000000'
    url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
    path = 'USD'
    times = '100'
    link = await LinkToken.deploy()
    mockOracle = await MockOracle.deploy(link.address)
    apiConsumer = await APIConsumer.deploy(mockOracle.address, jobId, fee, link.address)
  })
  it("Random Number Should successfully make an external API request", async () => {
    //Before we can do an API request, we need to fund it with LINK
    // await hre.run("fund-link", { contract: randomNumberConsumer.address, linkAddress: link.address })
    await link.transfer(apiConsumer.address, '2000000000000000000')
    let transaction = await apiConsumer.requestVolumeData()
    let tx_receipt = await transaction.wait()
    let requestId = tx_receipt.events[0].topics[1]
    // console.log(tx_receipt.events)
    //Test the result of the random number request
    let expected = web3.utils.padLeft(web3.utils.padLeft(web3.utils.toHex('777')), 64)
    let tx = await mockOracle.fulfillOracleRequest(requestId, expected)
    await tx.wait()
    let result = await apiConsumer.volume()
    console.log("Result: ", result)
    expect(result).to.equal(777)
  })
})
