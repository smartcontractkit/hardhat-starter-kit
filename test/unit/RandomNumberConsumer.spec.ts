import { expect } from "chai"
import hre from "hardhat"
import { autoFundCheck, developmentChains, networkConfig } from "../../helper-hardhat-config"
import { LinkToken, RandomNumberConsumer } from "../../typechain"

const { network, ethers, run, getChainId, deployments } = hre

if (developmentChains.includes(network.name)) {
  describe("RandomNumberConsumer Unit Tests", async function () {
    let randomNumberConsumer: RandomNumberConsumer
    let linkToken: LinkToken

    beforeEach(async () => {
      const chainId = await getChainId()
      await deployments.fixture(["mocks", "vrf"])
      const LinkToken = await deployments.get("LinkToken")
      linkToken = (await ethers.getContractAt("LinkToken", LinkToken.address)) as LinkToken
      const networkName = networkConfig[chainId].name

      const linkTokenAddress: string = linkToken.address
      const additionalMessage: string = ` --linkaddress ${linkTokenAddress}`

      const RandomNumberConsumer = await deployments.get("RandomNumberConsumer")
      randomNumberConsumer = (await ethers.getContractAt(
        "RandomNumberConsumer",
        RandomNumberConsumer.address,
      )) as RandomNumberConsumer

      if (await autoFundCheck(randomNumberConsumer.address, networkName, linkTokenAddress, additionalMessage, hre)) {
        await run("fund-link", { contract: randomNumberConsumer.address, linkaddress: linkTokenAddress })
      }
    })

    it("Should successfully make an external random number request", async () => {
      const transaction = await randomNumberConsumer.getRandomNumber()
      const numberOfConfirmations: number = 1
      const tx_receipt = await transaction.wait(numberOfConfirmations)

      if (tx_receipt.events) {
        const requestId: string = tx_receipt.events[2].topics[1]
        expect(requestId).to.not.be.null
      }
    })
  })
}
