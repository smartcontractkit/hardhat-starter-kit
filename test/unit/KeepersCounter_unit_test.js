const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains, networkConfig } = require("../../helper-hardhat-config")
const { expectRevert } = require('@openzeppelin/test-helpers')

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("Keepers Counter Unit Tests", async function () {
    beforeEach(async () => {
      await deployments.fixture(["mocks", "keepers"])
      counter = await ethers.getContract("KeepersCounter")
      chainId = await getChainId()
    })

    context("Basic upkeep", async () => {
      it('should be able to call checkUpkeep', async () => {
        const checkData = ethers.utils.hexlify("0x");
        const { upkeepNeeded, performData } = await counter.checkUpkeep(checkData);
      })

      it('should be able to call performUpkeep', async () => {
        const checkData = ethers.utils.hexlify("0x");
        await counter.performUpkeep(checkData);
        //now get the new counter value
        const result = await counter.counter()
        console.log("Keepers Counter value: ", new ethers.BigNumber.from(result._hex).toString())
        expect(new ethers.BigNumber.from(result).toString()).to.be.a.bignumber.that.is.greaterThan(new ethers.BigNumber.from(0).toString())
      })
    })

    context("Upkeep with checkData - unhappy paths", async () => {
      before(function() {
        if(networkConfig[chainId].multiplierEnabled == "false") this.skip();
      });
      it("Should not require upkeep from checkMultiplier if not enabled", async () => {
        await counter.setMultiplierEnabled(false);
        const returnData = await counter.checkMultiplier()
        expect(returnData[0]).to.be.equal(false)
      })

      it("Should not multiply counter if not enabled", async () => {
        await expectRevert(counter.multiplyCounter(3), "Upkeep not satisfied")
      })

      it("Should not require upkeep from checkMultiplier if not valid value", async () => {
        await counter.setMultiplierEnabled(true);
        const returnData = await counter.checkMultiplier()
        expect(returnData[0]).to.be.equal(false)
      })

      it("Should not multiply counter if not valid value", async () => {
        for(let i=0; i<3; i++) {
          await counter.performUpkeep(ethers.utils.hexlify("0x"));
        }
        await expectRevert(counter.multiplyCounter(2), "Only valid multiplier")
      })

      it("Should not require upkeep from checkReset if too early", async () => {
        const returnData = await counter.checkReset()
        expect(returnData[0]).to.be.equal(false)
      })

      it("Should not reset counter if too early", async () => {
        await expectRevert(counter.resetCounter(), "Too early")
      })
    })

    context("Upkeep with checkData - happy paths", async () => {
      before(function() {
        if(networkConfig[chainId].multiplierEnabled == "false") this.skip();
      });
      beforeEach(async () => {
        for(let i=0; i<3; i++) {
          await counter.performUpkeep(ethers.utils.hexlify("0x"));
        }
      })

      it("Should be able to call checkUpkeep for checkMultiplier", async () => {
        const abi = ["function checkMultiplier()", "function multiplyCounter(uint)"]
        const iface = new ethers.utils.Interface(abi)
        const checkData = iface.encodeFunctionData("checkMultiplier", [])
        console.log(`checkMultiplier checkData: ${checkData}`)
        const { upkeepNeeded, performData } = await counter.checkUpkeep(checkData)
        const calldata = iface.encodeFunctionData("multiplyCounter", ["3"])
        expect(upkeepNeeded).to.be.equal(true)
        expect(performData).to.be.equal(calldata)
      })

      it("Should call performUpkeep for multiplyCounter", async () => {
        const abi = ["function multiplyCounter(uint)"]
        const iface = new ethers.utils.Interface(abi)
        const checkData = iface.encodeFunctionData("multiplyCounter", ["3"])
        await counter.performUpkeep(checkData)
        const result = await counter.counter()
        expect(result).to.be.equal(new ethers.BigNumber.from("9"))
      })

      it("Should be able to call checkUpkeep for checkReset", async () => {
        await counter.multiplyCounter(3);
        await counter.performUpkeep(ethers.utils.hexlify("0x"));
        await counter.multiplyCounter(10);
        await counter.performUpkeep(ethers.utils.hexlify("0x"));
        const abi = ["function checkReset()", "function resetCounter()"]
        const iface = new ethers.utils.Interface(abi)
        const checkData = iface.encodeFunctionData("checkReset", [])
        console.log(`checkReset checkData: ${checkData}`)
        const { upkeepNeeded, performData } = await counter.checkUpkeep(checkData)
        const calldata = iface.encodeFunctionData("resetCounter", [])
        expect(upkeepNeeded).to.be.equal(true)
        expect(performData).to.be.equal(calldata)
      })

      it("Should call performUpkeep for resetCounter", async () => {
        await counter.multiplyCounter(3);
        await counter.performUpkeep(ethers.utils.hexlify("0x"));
        await counter.multiplyCounter(10);
        await counter.performUpkeep(ethers.utils.hexlify("0x"));
        const abi = ["function resetCounter()"]
        const iface = new ethers.utils.Interface(abi)
        const checkData = iface.encodeFunctionData("resetCounter", [])
        await counter.performUpkeep(checkData)
        const result = await counter.counter()
        expect(result).to.be.equal(new ethers.BigNumber.from("0"))
      })
    })
  })
