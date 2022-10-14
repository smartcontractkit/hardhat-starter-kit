const { network } = require("hardhat")
const { loadFixture, time } = require("@nomicfoundation/hardhat-network-helpers")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Automation Counter Unit Tests", async function () {
          // We define a fixture to reuse the same setup in every test.
          // We use loadFixture to run this setup once, snapshot that state,
          // and reset Hardhat Network to that snapshot in every test.
          async function deployAutomationCounterFixture() {
              const [deployer] = await ethers.getSigners()

              const chainId = network.config.chainId
              const automationUpdateInterval =
                  networkConfig[chainId]["automationUpdateInterval"] || "30"

              const counterFactory = await ethers.getContractFactory("AutomationCounter")
              const counter = await counterFactory
                  .connect(deployer)
                  .deploy(automationUpdateInterval)

              return { counter }
          }

          describe("#checkUpkeep", async function () {
              describe("success", async function () {
                  it("should be able to call checkUpkeep", async function () {
                      const { counter } = await loadFixture(deployAutomationCounterFixture)
                      const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
                      const { upkeepNeeded } = await counter.callStatic.checkUpkeep(checkData)
                      assert.equal(upkeepNeeded, false)
                  })
              })
          })

          describe("#performUpkeep", async function () {
              describe("success", async function () {
                  it("should be able to call performUpkeep after time passes", async function () {
                      const { counter } = await loadFixture(deployAutomationCounterFixture)
                      const startingCount = await counter.counter()
                      const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
                      const interval = await counter.interval()
                      await time.increase(interval.toNumber() + 1)
                      await counter.performUpkeep(checkData)
                      assert.equal(startingCount + 1, (await counter.counter()).toNumber())
                  })
              })

              describe("failure", async function () {
                  it("should not be able to call perform upkeep without the time passed interval", async function () {
                      const { counter } = await loadFixture(deployAutomationCounterFixture)
                      const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
                      await expect(counter.performUpkeep(checkData)).to.be.revertedWith(
                          "Time interval not met"
                      )
                  })
              })
          })
      })
