const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("RandomNumberConsumer Unit Tests", async function () {
      let randomNumberConsumer, linkToken, vrfCoordinatorMock

      beforeEach(async () => {
        await deployments.fixture(["mocks", "vrf"])
        linkToken = await ethers.getContract("LinkToken")
        vrfCoordinatorMock = await ethers.getContract("VRFCoordinatorMock")
        linkTokenAddress = linkToken.address
        additionalMessage = " --linkaddress " + linkTokenAddress

        randomNumberConsumer = await ethers.getContract("RandomNumberConsumer")

        await hre.run("fund-link", {
          contract: randomNumberConsumer.address,
          linkaddress: linkTokenAddress,
        })
      })

      it("Should successfully request a random number", async () => {
        const transaction = await randomNumberConsumer.getRandomNumber()
        const transactionReceipt = await transaction.wait(1)
        const requestId = transactionReceipt.events[0].topics[1]
        console.log("requestId: ", requestId)
        expect(requestId).to.not.be.null
      })

      it("Should successfully request a random number and get a result", async () => {
        const transaction = await randomNumberConsumer.getRandomNumber()
        const transactionReceipt = await transaction.wait(1)
        const requestId = transactionReceipt.events[0].topics[1]
        const randomValue = 777
        await vrfCoordinatorMock.callBackWithRandomness(
          requestId,
          randomValue,
          randomNumberConsumer.address
        )
        assert.equal((await randomNumberConsumer.randomResult()).toString(), randomValue)
      })

      it("Our event should successfully fire event on callback", async function () {
        const randomValue = 777
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
              assert.equal(result.toString(), randomValue.toString())
              resolve()
            } catch (e) {
              reject(e)
            }
          })
          const transaction = await randomNumberConsumer.getRandomNumber()
          const transactionReceipt = await transaction.wait(1)
          const requestId = transactionReceipt.events[0].topics[1]
          await vrfCoordinatorMock.callBackWithRandomness(
            requestId,
            randomValue,
            randomNumberConsumer.address
          )
        })
      })
    })
