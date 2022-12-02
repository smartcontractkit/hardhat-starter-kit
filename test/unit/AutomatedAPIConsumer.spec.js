const { network, ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { developmentChains } = require("../../helper-hardhat-config")
const {
    deployAutomatedApiConsumer,
} = require("../../scripts/deployment/deployAutomatedApiConsumer")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Automated API Consumer Unit Tests", async function () {
          // We define a fixture to reuse the same setup in every test.
          // We use loadFixture to run this setup once, snapshot that state,
          // and reset Hardhat Network to that snapshot in every test.

          it("should be able to call checkUpkeep", async () => {
              const { apiConsumer } = await loadFixture(deployAutomatedApiConsumer)
              const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
              const { upkeepNeeded } = await apiConsumer.callStatic.checkUpkeep(checkData)
              assert.equal(upkeepNeeded, false)
          })

          it("should not be able to call perform upkeep without the time passed interval", async () => {
              const { apiConsumer } = await loadFixture(deployAutomatedApiConsumer)
              const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
              await expect(apiConsumer.performUpkeep(checkData)).to.be.revertedWith(
                  "Time interval not met"
              )
          })

          it("should show upkeepNeeded as true after elapsing interval", async () => {
              const { apiConsumer } = await loadFixture(deployAutomatedApiConsumer)
              const updateInterval = await apiConsumer.interval()
              await network.provider.send("evm_increaseTime", [updateInterval.toNumber()])
              await network.provider.send("evm_mine")
              const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
              const [upkeepNeeded] = await apiConsumer.checkUpkeep(checkData)
              assert.equal(upkeepNeeded, true)
          })

          it("should be able to call performUpkeep after time passes", async () => {
              const { apiConsumer } = await loadFixture(deployAutomatedApiConsumer)
              const updateInterval = await apiConsumer.interval()
              await network.provider.send("evm_increaseTime", [updateInterval.toNumber()])
              await network.provider.send("evm_mine")
              const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
              const transaction = await apiConsumer.performUpkeep(checkData)
              const receipt = await transaction.wait()
              const event = receipt.events.find(({ event }) => event === "ExecuteRequestInvoked")
              assert.exists(event)
          })

          it("should successfully make an API request and get a result", async () => {
              const { apiConsumer, mockOracle } = await loadFixture(deployAutomatedApiConsumer)
              // Advance time to where performUpkeep can be called
              const updateInterval = await apiConsumer.interval()
              await network.provider.send("evm_increaseTime", [updateInterval.toNumber()])
              await network.provider.send("evm_mine")
              // CL Automation calls performUpkeep
              const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
              const transaction = await apiConsumer.performUpkeep(checkData)
              const receipt = await transaction.wait()
              const event = receipt.events.find(({ event }) => event === "RequestSent")
              const requestId = event.args[0]
              // Oracle fulfills request
              const callbackValue = 777
              await mockOracle.fulfillRequest(
                  requestId,
                  ethers.utils.formatBytes32String(String(callbackValue)),
                  ethers.utils.formatBytes32String(0)
              )
              await network.provider.send("evm_increaseTime", [1])
              await network.provider.send("evm_mine")
              // Check Consumer contract value
              const value = await apiConsumer.value()
              assert.equal(ethers.utils.parseBytes32String(value), callbackValue)
          })
      })
