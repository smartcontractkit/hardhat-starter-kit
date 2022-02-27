const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("RandomNumberConsumer Unit Tests", async function () {
      let randomNumberConsumerV2, vrfCoordinatorV2Mock

      beforeEach(async () => {
        await deployments.fixture(["mocks", "vrf"])
        vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
        randomNumberConsumerV2 = await ethers.getContract("RandomNumberConsumerV2")
      })

      it("Should successfully request a random number", async () => {
        await expect(randomNumberConsumerV2.requestRandomWords()).to.emit(
          vrfCoordinatorV2Mock,
          "RandomWordsRequested"
        )
      })

      it("Should successfully request a random number and get a result", async () => {
        await randomNumberConsumerV2.requestRandomWords()
        const requestId = await randomNumberConsumerV2.s_requestId()

        // simulate callback from the oracle network
        await expect(
          vrfCoordinatorV2Mock.fulfillRandomWords(requestId, randomNumberConsumerV2.address)
        ).to.emit(randomNumberConsumerV2, "ReturnedRandomness")

        const firstRandomNumber = await randomNumberConsumerV2.s_randomWords(0)
        const secondRandomNumber = await randomNumberConsumerV2.s_randomWords(1)

        assert(
          firstRandomNumber.gt(ethers.constants.Zero),
          "First random number is greather than zero"
        )

        assert(
          secondRandomNumber.gt(ethers.constants.Zero),
          "Second random number is greather than zero"
        )
      })
    })
