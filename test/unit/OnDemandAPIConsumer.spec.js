const { assert, expect } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { network, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { deployOnDemandApiConsumer } = require("../../scripts/deployment/deployOnDemandApiConsumer")
const { encrypt } = require("../../scripts/encrypt")
const { decrypt } = require("../../scripts/decrypt")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("On Demand API Consumer Unit Tests", async function () {
          // We define a fixture to reuse the same setup in every test.
          // We use loadFixture to run this setup once, snapshot that state,
          // and reset Hardhat Network to that snapshot in every test.

          it("should be able to estimate the cost of a request", async () => {
              const { apiConsumer, mockOracle, subscriptionId } = await loadFixture(
                  deployOnDemandApiConsumer
              )
              //   Consumer calls executeRequest
              const source = `function run(args, queryResponses) {
                  const avgPrice = (queryResponses[0].data.price + queryResponses[1].data.price) / 2;
                  return Math.round(avgPrice * args[0]);
              }`
              const arguments = [] // TODO
              const secrets = [] // TODO
              const gasLimit = 50_000
              const gasPrice = 4_388_265

              const estimatedCost = await apiConsumer.estimateCost(
                  [
                      0, // Inline
                      0, // Inline
                      0, // JavaScript
                      source,
                      secrets,
                      arguments,
                  ],
                  subscriptionId,
                  gasLimit,
                  gasPrice
              )
              assert.isTrue(estimatedCost.gt(0))
          })

          //   it("should successfully make an API request and get a result", async () => {
          //     const { apiConsumer, mockOracle, subscriptionId } = await loadFixture(
          //         deployOnDemandApiConsumer
          //     )
          //     //   Consumer calls executeRequest
          //     const source = `function run(args, queryResponses) {
          //         const avgPrice = (queryResponses[0].data.price + queryResponses[1].data.price) / 2;
          //         return Math.round(avgPrice * args[0]);
          //     }`
          //     const arguments = [] // TODO
          //     const secrets = [] // TODO
          //     const gasLimit = 50_000
          //     const args = [source, secrets, arguments, subscriptionId, gasLimit]

          //     const transaction = await apiConsumer.executeRequest(...args)
          //     const receipt = await transaction.wait()
          //     const event = receipt.events.find(({ event }) => event === "RequestSent")
          //     const requestId = event.args[0]
          //     // Oracle fulfills request
          //     const callbackValue = 888
          //     await mockOracle.transmit(
          //         requestId,
          //         ethers.utils.formatBytes32String(String(callbackValue)),
          //         ethers.utils.formatBytes32String(0)
          //     )
          //     await network.provider.send("evm_increaseTime", [1])
          //     await network.provider.send("evm_mine")
          //     // Check Consumer contract value
          //     const value = await apiConsumer.value()
          //     assert.equal(ethers.utils.parseBytes32String(String(value)), callbackValue)
          // })

          //   it("should reveal a public key to decrypt secrets with", async () => {
          //       const { apiConsumer } = await loadFixture(deployOnDemandApiConsumer)
          //       const deployerWallet = ethers.Wallet.fromMnemonic(
          //           networkConfig[network.config.chainId].deployerMnemonic
          //       )
          //       const publicKeyBytesString = await apiConsumer.getDONPublicKey()
          //       const publicKeyBytes = ethers.utils.arrayify(publicKeyBytesString)
          //       const publicKey = ethers.utils.toUtf8String(publicKeyBytes)
          //       const rawSecrets = { apiKey: "my_super_secret_api_key" }
          //       const secretsJsonString = JSON.stringify(rawSecrets)
          //       const secretsEncryptedString = await encrypt(
          //           deployerWallet.privateKey,
          //           publicKey,
          //           secretsJsonString
          //       )
          //       //   Consumer calls executeRequest
          //       const source = `function run(args, queryResponses) {
          //               const avgPrice = (queryResponses[0].data.price + queryResponses[1].data.price) / 2;
          //               return Math.round(avgPrice * args[0]);
          //           }`
          //       const arguments = ["arg1", "arg2"]
          //       const queries = []
          //       const secrets = ethers.utils.toUtf8Bytes(secretsEncryptedString)
          //       const args = [source, arguments, queries, secrets]

          //       const transaction = await apiConsumer.executeRequest(...args)
          //       await transaction.wait()

          //       const { message, sender } = await decrypt(
          //           networkConfig[network.config.chainId].OCR2ODMockPrivateKey,
          //           secretsEncryptedString
          //       )
          //       assert.equal(message, secretsJsonString)
          //       assert.equal(sender, deployerWallet.address)
          //   })
      })
