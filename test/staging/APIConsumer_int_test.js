const { assert, expect } = require("chai")
const { network, ethers, run } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { autoFundCheck } = require("../../helper-functions")

developmentChains.includes(network.name)
  ? describe.skip
  : describe("APIConsumer Staging Tests", async function () {
      let apiConsumer, linkTokenAddress

      beforeEach(async () => {
        apiConsumer = await ethers.getContract("APIConsumer")
        linkTokenAddress = networkConfig[network.config.chainId].linkToken
        if (await autoFundCheck(apiConsumer.address, network.name, linkTokenAddress, "")) {
          await run("fund-link", {
            contract: apiConsumer.address,
            linkaddress: linkTokenAddress,
          })
        }
      })

      afterEach(async function () {
        apiConsumer.removeAllListeners()
      })

      // We can't use an arrow functions here because we need to use `this`. So we need
      // to use `async function() {` as seen.
      it("Our event should successfully fire on callback", async function () {
        this.timeout(200000) // wait 200 seconds max
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
