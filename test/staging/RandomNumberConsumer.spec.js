const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")
const VRF_COORDINATOR_ABI = require("@chainlink/contracts/abi/v0.8/VRFCoordinatorV2.json")
const LINK_TOKEN_ABI = require("@chainlink/contracts/abi/v0.4/LinkToken.json")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Random Number Consumer Staging Tests", async function () {
          let randomNumberConsumerV2

          before(async function () {
              const [deployer] = await ethers.getSigners()

              const chainId = network.config.chainId

              let subscriptionId = networkConfig[chainId]["subscriptionId"]
              const vrfCoordinatorAddress = networkConfig[chainId]["vrfCoordinator"]
              const keyHash = networkConfig[chainId]["keyHash"]

              const vrfCoordinator = new ethers.Contract(
                  vrfCoordinatorAddress,
                  VRF_COORDINATOR_ABI,
                  deployer
              )

              if (!subscriptionId) {
                  const transaction = await vrfCoordinator.createSubscription()
                  const transactionReceipt = await transaction.wait(1)
                  subscriptionId = ethers.BigNumber.from(transactionReceipt.events[0].topics[1])

                  const fundAmount = networkConfig[chainId]["fundAmount"]
                  const linkTokenAddress = networkConfig[chainId]["linkToken"]
                  const linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer)
                  await linkToken.transferAndCall(
                      vrfCoordinatorAddress,
                      fundAmount,
                      ethers.utils.defaultAbiCoder.encode(["uint64"], [subscriptionId])
                  )
              }

              const randomNumberConsumerV2Factory = await ethers.getContractFactory(
                  "RandomNumberConsumerV2"
              )
              randomNumberConsumerV2 = await randomNumberConsumerV2Factory
                  .connect(deployer)
                  .deploy(subscriptionId, vrfCoordinatorAddress, keyHash)

              await vrfCoordinator.addConsumer(subscriptionId, randomNumberConsumerV2.address)
          })

          it.only("Our event should successfully fire event on callback", async function () {
              // we setup a promise so we can wait for our callback from the `once` function
              await new Promise(async (resolve, reject) => {
                  // setup listener for our event
                  randomNumberConsumerV2.once("ReturnedRandomness", async () => {
                      console.log("ReturnedRandomness event fired!")
                      const firstRandomNumber = await randomNumberConsumerV2.s_randomWords(0)
                      const secondRandomNumber = await randomNumberConsumerV2.s_randomWords(1)
                      // assert throws an error if it fails, so we need to wrap
                      // it in a try/catch so that the promise returns event
                      // if it fails.
                      try {
                          assert(
                              firstRandomNumber.gt(ethers.constants.Zero),
                              "First random number is greather than zero"
                          )
                          assert(
                              secondRandomNumber.gt(ethers.constants.Zero),
                              "Second random number is greather than zero"
                          )
                          resolve()
                      } catch (e) {
                          reject(e)
                      }
                  })

                  await randomNumberConsumerV2.requestRandomWords()
              })
          })
      })
