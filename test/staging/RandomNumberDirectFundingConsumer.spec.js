const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")
const LINK_TOKEN_ABI = require("@chainlink/contracts/abi/v0.4/LinkToken.json")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("Random Number Direct Funding Consumer Staging Tests", async () => {
          let randomNumberConsumerV2, linkToken, deployer

          before(async () => {
              ;[deployer] = await ethers.getSigners()

              const chainId = network.config.chainId

              const vrfWrapperAddress = networkConfig[chainId]["vrfWrapper"]

              const randomNumberConsumerV2Factory = await ethers.getContractFactory(
                  "RandomNumberDirectFundingConsumerV2"
              )
              const linkTokenAddress = networkConfig[chainId]["linkToken"]
              linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer)
              randomNumberConsumerV2 = await randomNumberConsumerV2Factory
                  .connect(deployer)
                  .deploy(linkTokenAddress, vrfWrapperAddress)
              await randomNumberConsumerV2.deployed()
              const fundAmount = "2000000000000000000" // 2

              const tx = await linkToken.transfer(randomNumberConsumerV2.address, fundAmount)
              // wait until the transaction is mined
              await tx.wait()
          })

          it("Our event should successfully fire event on callback", async () => {
              const gasLimit = 200000
              const numWords = 2
              // we setup a promise so we can wait for our callback from the `once` function
              await new Promise(async (resolve, reject) => {
                  // setup listener for our event
                  randomNumberConsumerV2.once("RequestFulfilled", async () => {
                      console.log("RequestFulfilled event fired!")
                      const requestId = await randomNumberConsumerV2.lastRequestId()
                      const numberOfRequests = await randomNumberConsumerV2.getNumberOfRequests()
                      const { fulfilled, randomWords } =
                          await randomNumberConsumerV2.getRequestStatus(requestId)

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
                      const tx = await randomNumberConsumerV2.requestRandomWords(
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
