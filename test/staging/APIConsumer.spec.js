const { network, ethers } = require("hardhat")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
const { assert } = require("chai")
const LINK_TOKEN_ABI = require("@chainlink/contracts/abi/v0.4/LinkToken.json")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("API Consumer Staging Tests", async function () {
          //set log level to ignore non errors
          ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)

          let apiConsumer

          before(async function () {
              const [deployer] = await ethers.getSigners()

              const chainId = network.config.chainId

              const oracle = networkConfig[chainId]["oracle"]
              const jobId = ethers.utils.toUtf8Bytes(networkConfig[chainId]["jobId"])
              const fee = networkConfig[chainId]["fee"]
              const linkTokenAddress = networkConfig[chainId]["linkToken"]

              const linkToken = new ethers.Contract(linkTokenAddress, LINK_TOKEN_ABI, deployer)

              const apiConsumerFactory = await ethers.getContractFactory("APIConsumer")
              apiConsumer = await apiConsumerFactory
                  .connect(deployer)
                  .deploy(oracle, jobId, fee, linkTokenAddress)

              const fundAmount = networkConfig[chainId]["fundAmount"]
              await linkToken.connect(deployer).transfer(apiConsumer.address, fundAmount)
          })

          it("Our event should successfully fire on callback", async function () {
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
                          assert(volume.gt(0), "The volume is more than 0. ")
                          resolve()
                      } catch (e) {
                          reject(e)
                      }
                  })

                  await apiConsumer.requestVolumeData()
              })
          })
      })
