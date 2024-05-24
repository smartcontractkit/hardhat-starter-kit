const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")
const LINK_TOKEN_ABI = require("@chainlink/contracts/abi/v0.8/LinkToken.json")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Random Number Direct Funding Consumer Staging Tests", async () => {
          let randomNumberConsumerV2Plus, linkToken, deployer

          before(async () => {
              ;[deployer] = await ethers.getSigners()

              const chainId = network.config.chainId

              const vrfWrapperAddress = networkConfig[chainId]["vrfWrapper"]

              const randomNumberConsumerV2PlusFactory = await ethers.getContractFactory(
                  "RandomNumberDirectFundingConsumerV2Plus"
              )
              const linkTokenAddress = networkConfig[chainId]["linkToken"]
              linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer)
              randomNumberConsumerV2Plus = await randomNumberConsumerV2PlusFactory
                  .connect(deployer)
                  .deploy(linkTokenAddress, vrfWrapperAddress)
              await randomNumberConsumerV2Plus.deployed()
              const fundAmount = "2000000000000000000" // 2

              const tx = await linkToken.transfer(randomNumberConsumerV2Plus.address, fundAmount)
              // wait until the transaction is mined
              await tx.wait()
          })

          it("Our event should successfully fire event on callback", async () => {
              const gasLimit = 200000
              const numWords = 2
              // we setup a promise so we can wait for our callback from the `once` function
              await new Promise(async (resolve, reject) => {
                  // setup listener for our event
                  randomNumberConsumerV2Plus.once("RequestFulfilled", async () => {
                      console.log("RequestFulfilled event fired!")
                      const requestId = await randomNumberConsumerV2Plus.lastRequestId()
                      const numberOfRequests = await randomNumberConsumerV2Plus.getNumberOfRequests()
                      const { fulfilled, randomWords } =
                          await randomNumberConsumerV2Plus.getRequestStatus(requestId)

                      try {
                          assert(
                              numberOfRequests.eq(ethers.constants.One),
                              "Number of requests is not One"
                          )
                          assert(fulfilled === true, "Fulfilled is false")
                          assert(
                              randomWords.length === numWords,
                              "Didn't obtain the right number of random words"
                          )
                          resolve()
                      } catch (e) {
                          reject(e)
                      }
                  })
                  try {
                      const tx = await randomNumberConsumerV2Plus.requestRandomWords(
                          gasLimit,
                          3,
                          numWords,
                          {
                              gasLimit: 400000,
                          }
                      )
                      // wait until the transaction is mined
                      const receipt = await tx.wait()
                      console.log("Request transaction hash", receipt.transactionHash)
                  } catch (error) {
                      reject(error)
                  }
              })
          })
      })
