const { assert, expect } = require("chai")
const { network, ethers, run } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { autoFundCheck } = require("../../helper-functions")

developmentChains.includes(network.name)
  ? describe.skip
  : describe("RandomNumberConsumer Staging Tests", async function () {
      let randomNumberConsumer, linkTokenAddress

      beforeEach(async () => {
        randomNumberConsumer = await ethers.getContract("RandomNumberConsumer")
        linkTokenAddress = networkConfig[network.config.chainId].linkToken
        if (await autoFundCheck(randomNumberConsumer.address, network.name, linkTokenAddress, "")) {
          await run("fund-link", {
            contract: randomNumberConsumer.address,
            linkaddress: linkTokenAddress,
          })
        }
      })

      // We can't use an arrow functions here because we need to use `this`. So we need
      // to use `async function() {` as seen.
      it("Our event should successfully fire event on callback", async function () {
        this.timeout(300000) // wait 300 seconds max
        // we setup a promise so we can wait for our callback from the `once` function
        await new Promise(async (resolve, reject) => {
          // setup listener for our event
          randomNumberConsumer.once("ReturnedRandomness", async () => {
            console.log("ReturnedRandomness event fired!")
            const result = await randomNumberConsumer.randomResult()
            // assert throws an error if it fails, so we need to wrap
            // it in a try/catch so that the promise returns event
            // if it fails.
            try {
              assert(result.gt(0), "The result is more than 0. ")
              resolve()
            } catch (e) {
              reject(e)
            }
          })
          const transaction = await randomNumberConsumer.getRandomNumber()
        })
      })
    })
