const { expect } = require("chai")
const skip = require("mocha-skip-if")
const { deployments } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")

skip.if(!developmentChains.includes(network.name)).describe("Keepers Counter Unit Tests", async function () {
  let counterContract

  beforeEach(async () => {
    await deployments.fixture(["mocks", "keepers"])
    const Counter = await deployments.get("Counter")
    counterContract = await ethers.getContractAt("Counter", Counter.address)
  })

  it("should be able to call checkUpkeep", async () => {
    const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))

    const latestBlock = await ethers.provider.getBlock("latest")
    const lastTimeStamp = await counterContract.lastTimeStamp()
    const interval = await counterContract.interval()

    const { upkeepNeeded, performData } = await counterContract.checkUpkeep(checkData)

    expect(upkeepNeeded).to.equal(ethers.BigNumber.from(latestBlock.timestamp).sub(lastTimeStamp).gt(interval))
  })

  it("should return true only after time interval", async () => {
    const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))

    let latestBlock = await ethers.provider.getBlock("latest")
    const lastTimeStamp = await counterContract.lastTimeStamp()
    expect(latestBlock.timestamp).to.equal(lastTimeStamp.toNumber())

    const firstCheck = await counterContract.checkUpkeep(checkData)
    expect(firstCheck.upkeepNeeded).to.equal(false)

    const interval = await counterContract.interval()
    const nextBlockTimestamp = interval.add(ethers.constants.One)
    await network.provider.send("evm_increaseTime", [nextBlockTimestamp.toNumber()])
    await network.provider.send("evm_mine")

    latestBlock = await ethers.provider.getBlock("latest")
    expect(latestBlock.timestamp - lastTimeStamp.toNumber()).to.be.greaterThan(interval.toNumber())

    const secondCheck = await counterContract.checkUpkeep(checkData)
    expect(secondCheck.upkeepNeeded).to.equal(true)
  })

  it("should increase counter after calling performUpkeep", async () => {
    const previousCounterValue = await counterContract.counter()

    const checkData = ethers.utils.keccak256(ethers.utils.toUtf8Bytes(""))
    await counterContract.performUpkeep(checkData)

    const currentCounterValue = await counterContract.counter()

    expect(currentCounterValue).to.equal(previousCounterValue.add(ethers.constants.One))
  })
})
