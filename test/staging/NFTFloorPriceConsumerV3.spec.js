const { network, ethers } = require("hardhat")
const { developmentChains } = require("../../helper-hardhat-config")
const { expect } = require("chai")

developmentChains.includes(network.name)
    ? describe.skip
    : describe("NFT Floor Price Consumer V3 Staging Tests", async function () {
          let nftFloorPriceConsumerV3

          before(async function () {
              const [deployer] = await ethers.getSigners()

              const nftFloorPriceConsumerV3Factory = await ethers.getContractFactory(
                  "NFTFloorPriceConsumerV3"
              )
              nftFloorPriceConsumerV3 = await nftFloorPriceConsumerV3Factory
                  .connect(deployer)
                  .deploy()
          })

          it("should get NFT floor price", async function () {
              expect(await nftFloorPriceConsumerV3.getLatestPrice()).not.be.null
          })
      })
