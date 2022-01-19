import { expect } from "chai"
import hre from "hardhat"
import { autoFundCheck, developmentChains, networkConfig } from "../../helper-hardhat-config"
import { APIConsumer, LinkToken } from "../../typechain"

const { network, ethers, run, getChainId, deployments } = hre

if (developmentChains.includes(network.name)) {
  describe(`APIConsumer Unit Tests`, async function () {
    let apiConsumer: APIConsumer
    let linkToken: LinkToken

    beforeEach(async () => {
      const chainId = await getChainId()
      await deployments.fixture([`mocks`, `api`])
      const LinkToken = await deployments.get(`LinkToken`)
      linkToken = (await ethers.getContractAt(`LinkToken`, LinkToken.address)) as LinkToken
      const networkName = networkConfig[chainId].name

      const linkTokenAddress = linkToken.address
      const additionalMessage = ` --linkaddress ${linkTokenAddress}`

      const APIConsumer = await deployments.get(`APIConsumer`)
      apiConsumer = (await ethers.getContractAt(`APIConsumer`, APIConsumer.address)) as APIConsumer

      if (await autoFundCheck(apiConsumer.address, networkName, linkTokenAddress, additionalMessage, hre)) {
        await run(`fund-link`, { contract: apiConsumer.address, linkaddress: linkTokenAddress })
      }
    })

    it(`Should successfully make an API request`, async () => {
      await expect(apiConsumer.requestVolumeData()).to.emit(apiConsumer, "ChainlinkRequested")
    })
  })
}
