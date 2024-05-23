const { network } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Random Number Consumer Unit Tests", async function () {
          // We define a fixture to reuse the same setup in every test.
          // We use loadFixture to run this setup once, snapshot that state,
          // and reset Hardhat Network to that snapshot in every test.
          async function deployRandomNumberConsumerFixture() {
              const [deployer] = await ethers.getSigners()

              /**
               * @dev Read more at https://docs.chain.link/docs/chainlink-vrf/
               */
              const BASE_FEE = "1000000000000000" // 0.001 ether as base fee
              const GAS_PRICE = "50000000000" // 50 gwei 
              const WEI_PER_UNIT_LINK = "10000000000000000" // 0.01 ether per LINK

              const chainId = network.config.chainId

              const VRFCoordinatorV2_5MockFactory = await ethers.getContractFactory(
                  "VRFCoordinatorV2_5Mock"
              )
              const VRFCoordinatorV2_5Mock = await VRFCoordinatorV2_5MockFactory.deploy(
                  BASE_FEE,
                  GAS_PRICE,
                  WEI_PER_UNIT_LINK
              )

              const fundAmount = networkConfig[chainId]["fundAmount"] || "1000000000000000000"
              const transaction = await VRFCoordinatorV2_5Mock.createSubscription()
              const transactionReceipt = await transaction.wait(1)
              const subscriptionId = ethers.BigNumber.from(transactionReceipt.events[0].topics[1])
              await VRFCoordinatorV2_5Mock.fundSubscription(subscriptionId, fundAmount)

              const vrfCoordinatorAddress = VRFCoordinatorV2_5Mock.address
              const keyHash =
                  networkConfig[chainId]["keyHash"] ||
                  "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc"

              const randomNumberConsumerV2PlusFactory = await ethers.getContractFactory(
                  "RandomNumberConsumerV2Plus"
              )
              const randomNumberConsumerV2Plus = await randomNumberConsumerV2PlusFactory
                  .connect(deployer)
                  .deploy(subscriptionId, vrfCoordinatorAddress, keyHash)

              await VRFCoordinatorV2_5Mock.addConsumer(subscriptionId, randomNumberConsumerV2Plus.address)

              return { randomNumberConsumerV2Plus, VRFCoordinatorV2_5Mock }
          }

          describe("#requestRandomWords", async function () {
              describe("success", async function () {
                  it("Should successfully request a random number", async function () {
                      const { randomNumberConsumerV2Plus, VRFCoordinatorV2_5Mock } = await loadFixture(
                          deployRandomNumberConsumerFixture
                      )
                      await expect(randomNumberConsumerV2Plus.requestRandomWords()).to.emit(
                          VRFCoordinatorV2_5Mock,
                          "RandomWordsRequested"
                      )
                  })

                  it("Should successfully request a random number and get a result", async function () {
                      const { randomNumberConsumerV2Plus, VRFCoordinatorV2_5Mock } = await loadFixture(
                          deployRandomNumberConsumerFixture
                      )
                      await randomNumberConsumerV2Plus.requestRandomWords()
                      const requestId = await randomNumberConsumerV2Plus.s_requestId()

                      // simulate callback from the oracle network
                      await expect(
                          VRFCoordinatorV2_5Mock.fulfillRandomWords(
                              requestId,
                              randomNumberConsumerV2Plus.address
                          )
                      ).to.emit(randomNumberConsumerV2Plus, "ReturnedRandomness")

                      const firstRandomNumber = await randomNumberConsumerV2Plus.s_randomWords(0)
                      const secondRandomNumber = await randomNumberConsumerV2Plus.s_randomWords(1)

                      assert(
                          firstRandomNumber.gt(ethers.constants.Zero),
                          "First random number is greater than zero"
                      )

                      assert(
                          secondRandomNumber.gt(ethers.constants.Zero),
                          "Second random number is greater than zero"
                      )
                  })

                  it("Should successfully fire event on callback", async function () {
                      const { randomNumberConsumerV2Plus, VRFCoordinatorV2_5Mock } = await loadFixture(
                          deployRandomNumberConsumerFixture
                      )

                      await new Promise(async (resolve, reject) => {
                          randomNumberConsumerV2Plus.once("ReturnedRandomness", async () => {
                              console.log("ReturnedRandomness event fired!")
                              const firstRandomNumber = await randomNumberConsumerV2Plus.s_randomWords(
                                  0
                              )
                              const secondRandomNumber = await randomNumberConsumerV2Plus.s_randomWords(
                                  1
                              )
                              // assert throws an error if it fails, so we need to wrap
                              // it in a try/catch so that the promise returns event
                              // if it fails.
                              try {
                                  assert(firstRandomNumber.gt(ethers.constants.Zero))
                                  assert(secondRandomNumber.gt(ethers.constants.Zero))
                                  resolve()
                              } catch (e) {
                                  reject(e)
                              }
                          })
                          await randomNumberConsumerV2Plus.requestRandomWords()
                          const requestId = await randomNumberConsumerV2Plus.s_requestId()
                          VRFCoordinatorV2_5Mock.fulfillRandomWords(
                              requestId,
                              randomNumberConsumerV2Plus.address
                          )
                      })
                  })
              })
          })
      })
