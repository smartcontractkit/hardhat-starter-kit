const { network, ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
const { numToBytes32 } = require("../../helper-functions")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("API Consumer Unit Tests", async function () {
          //set log level to ignore non errors
          ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)

          // We define a fixture to reuse the same setup in every test.
          // We use loadFixture to run this setup once, snapshot that state,
          // and reset Hardhat Network to that snapshot in every test.
          async function deployAPIConsumerFixture() {
              const [deployer] = await ethers.getSigners()

              const chainId = network.config.chainId

              const linkTokenFactory = await ethers.getContractFactory("LinkToken")
              const linkToken = await linkTokenFactory.connect(deployer).deploy()

              const mockOracleFactory = await ethers.getContractFactory("MockOracle")
              const mockOracle = await mockOracleFactory.connect(deployer).deploy(linkToken.address)

              const jobId = ethers.utils.toUtf8Bytes(networkConfig[chainId]["jobId"])
              const fee = networkConfig[chainId]["fee"]

              const apiConsumerFactory = await ethers.getContractFactory("APIConsumer")
              const apiConsumer = await apiConsumerFactory
                  .connect(deployer)
                  .deploy(mockOracle.address, jobId, fee, linkToken.address)

              const fundAmount = networkConfig[chainId]["fundAmount"] || "1000000000000000000"
              await linkToken.connect(deployer).transfer(apiConsumer.address, fundAmount)

              return { apiConsumer, mockOracle }
          }

          describe("#requestVolumeData", async function () {
              describe("success", async function () {
                  it("Should successfully make an API request", async function () {
                      const { apiConsumer } = await loadFixture(deployAPIConsumerFixture)
                      const transaction = await apiConsumer.requestVolumeData()
                      const transactionReceipt = await transaction.wait(1)
                      const requestId = transactionReceipt.events[0].topics[1]
                      expect(requestId).to.not.be.null
                  })

                  it("Should successfully make an API request and get a result", async function () {
                      const { apiConsumer, mockOracle } = await loadFixture(
                          deployAPIConsumerFixture
                      )
                      const transaction = await apiConsumer.requestVolumeData()
                      const transactionReceipt = await transaction.wait(1)
                      const requestId = transactionReceipt.events[0].topics[1]
                      const callbackValue = 777
                      await mockOracle.fulfillOracleRequest(requestId, numToBytes32(callbackValue))
                      const volume = await apiConsumer.volume()
                      assert.equal(volume.toString(), callbackValue.toString())
                  })

                  it("Our event should successfully fire event on callback", async function () {
                      const { apiConsumer, mockOracle } = await loadFixture(
                          deployAPIConsumerFixture
                      )
                      const callbackValue = 777
                      // we setup a promise so we can wait for our callback from the `once` function
                      await new Promise(async (resolve, reject) => {
                          // setup listener for our event
                          apiConsumer.once("DataFullfilled", async () => {
                              console.log("DataFullfilled event fired!")
                              const volume = await apiConsumer.volume()
                              // assert throws an error if it fails, so we need to wrap
                              // it in a try/catch so that the promise returns event
                              // if it fails.
                              try {
                                  assert.equal(volume.toString(), callbackValue.toString())
                                  resolve()
                              } catch (e) {
                                  reject(e)
                              }
                          })
                          const transaction = await apiConsumer.requestVolumeData()
                          const transactionReceipt = await transaction.wait(1)
                          const requestId = transactionReceipt.events[0].topics[1]
                          await mockOracle.fulfillOracleRequest(
                              requestId,
                              numToBytes32(callbackValue)
                          )
                      })
                  })
              })
          })
      })
