const { assert } = require("chai")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { network, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { deployOnDemandApiConsumer } = require("../../scripts/deployment/deployOnDemandApiConsumer")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("On Demand API Consumer Unit Tests", async function () {
          // We define a fixture to reuse the same setup in every test.
          // We use loadFixture to run this setup once, snapshot that state,
          // and reset Hardhat Network to that snapshot in every test.

          it("should successfully make an API request and get a result", async () => {
              const { apiConsumer, mockOracle } = await loadFixture(deployOnDemandApiConsumer)
              // Consumer calls executeRequest
              const source = `function run(args, queryResponses) {
                const avgPrice = (queryResponses[0].data.price + queryResponses[1].data.price) / 2;
                return Math.round(avgPrice * args[0]);
            }`
              const arguments = [] // TODO
              const queries = [] // TODO
              const secrets = [] // TODO
              const args = [source, arguments, queries, secrets]

              const transaction = await apiConsumer.executeRequest(...args)
              const receipt = await transaction.wait()
              const event = receipt.events.find(({ event }) => event === "RequestSent")
              const requestId = event.args[0]
              // Oracle fulfills request
              const callbackValue = 888
              await mockOracle.fulfillRequest(
                  requestId,
                  ethers.utils.formatBytes32String(String(callbackValue)),
                  ethers.utils.formatBytes32String(0)
              )
              await network.provider.send("evm_increaseTime", [1])
              await network.provider.send("evm_mine")
              // Check Consumer contract value
              const value = await apiConsumer.value()
              assert.equal(ethers.utils.parseBytes32String(String(value)), callbackValue)
          })
      })
