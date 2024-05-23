const { network } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { networkConfig, developmentChains } = require("../../helper-hardhat-config")
const { assert, expect } = require("chai")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Random Number Direct Funding Consumer Unit Tests", async () => {
          const BigNumber = ethers.BigNumber
          const pointOneLink = BigNumber.from("100000000000000000") // 0.1
          const pointZeroZeroThreeLink = BigNumber.from("3000000000000000") // 0.003
          const oneHundredLink = BigNumber.from("100000000000000000000") // 100 LINK
          const oneHundredGwei = BigNumber.from("100000000000")

          const BASE_FEE = "1000000000000000" // 0.001 ether as base fee
          const GAS_PRICE = "50000000000" // 50 gwei 
          const WEI_PER_UNIT_LINK = "10000000000000000" // 0.01 ether per LINK

          // Configuration

          // This value is the worst-case gas overhead from the wrapper contract under the following
          // conditions, plus some wiggle room:
          //   - 10 words requested
          //   - Refund issued to consumer
          const wrapperGasOverhead = BigNumber.from("13400")
          const coordinatorGasOverheadNative = BigNumber.from("90000")
          const coordinatorGasOverheadLink = BigNumber.from("112000")
          const coordinatorGasOverheadPerWord = BigNumber.from("435")
          const coordinatorNativePremiumPercentage = 24
          const coordinatorLinkPremiumPercentage = 20
          const maxNumWords = 10
          const stalenessSeconds = BigNumber.from("172800")
          const fallbackWeiPerUnitLink = BigNumber.from("5347462396894712")
          const fulfillmentFlatFeeNativePPM = BigNumber.from("0")
          const fulfillmentFlatFeeLinkDiscountPPM = BigNumber.from("0")

          const weiPerUnitLink = pointZeroZeroThreeLink
          const flatFee = pointOneLink

          const fund = async (link, linkOwner, receiver, amount) => {
              await expect(link.connect(linkOwner).transfer(receiver, amount)).to.not.be.reverted
          }

        const estimateRequestPriceNative  = (
            _callbackGasLimit, 
            _numWords, 
            _requestGasPriceWei = oneHundredGwei
        ) => {
            const wrapperCostWei = _requestGasPriceWei.mul(wrapperGasOverhead)
            const coordinatorOverhead = coordinatorGasOverheadPerWord.mul(_numWords).add(coordinatorGasOverheadNative)
            
            const coordinatorCostWei = _requestGasPriceWei
                .mul((_callbackGasLimit.add(coordinatorOverhead)));
            
            const coordinatorCostWithPremiumAndFlatFeeWei = 
                (coordinatorCostWei
                    .mul((coordinatorNativePremiumPercentage.add(100)))
                    .div(100))
                .add(BigNumber.from(1000000000000).mul(fulfillmentFlatFeeNativePPM))

            return wrapperCostWei.add(coordinatorCostWithPremiumAndFlatFeeWei);
        }

        const estimateRequestPrice = (
                _callbackGasLimit,
                _numWords,
                _requestGasPriceWei = oneHundredGwei,
                _weiPerUnitLink = WEI_PER_UNIT_LINK
        ) => {
            const wrapperCostWei = _requestGasPriceWei.mul(wrapperGasOverhead)
            const coordinatorOverhead = coordinatorGasOverheadPerWord.mul(_numWords).add(coordinatorGasOverheadLink)
            
            const coordinatorCostWei = _requestGasPriceWei
                .mul((BigNumber.from(_callbackGasLimit).add(coordinatorOverhead)));
            
            const coordinatorCostWithPremiumAndFlatFeeWei = 
                (coordinatorCostWei
                    .mul((BigNumber.from(coordinatorLinkPremiumPercentage).add(100)))
                    .div(100))
                .add(BigNumber.from(1000000000000).mul(fulfillmentFlatFeeNativePPM.sub(fulfillmentFlatFeeLinkDiscountPPM)))
            
            return (BigNumber.from("1000000000000000000").mul(wrapperCostWei.add(coordinatorCostWithPremiumAndFlatFeeWei))).div(_weiPerUnitLink)
        }

          // We define a fixture to reuse the same setup in every test.
          // We use loadFixture to run this setup once, snapshot that state,
          // and reset Hardhat Network to that snapshot in every test.
          const deployRandomNumberConsumerFixture = async () => {
              const [owner, requester, consumerOwner, withdrawRecipient] = await ethers.getSigners()

              // first deploy VRFCoordinatorV2
              /**
               * @dev Read more at https://docs.chain.link/docs/chainlink-vrf/
               */

              const chainId = network.config.chainId

              const coordinatorFactory = await ethers.getContractFactory(
                  "VRFCoordinatorV2_5Mock",
                  owner
              )
              const coordinator = await coordinatorFactory.deploy(
                BASE_FEE,
                GAS_PRICE,
                WEI_PER_UNIT_LINK
              )

              const transaction = await coordinator.createSubscription()
              const transactionReceipt = await transaction.wait(1)
              const subscriptionId = ethers.BigNumber.from(transactionReceipt.events[0].topics[1])

              const linkEthFeedFactory = await ethers.getContractFactory("MockV3Aggregator", owner)
              const linkEthFeed = await linkEthFeedFactory.deploy(18, WEI_PER_UNIT_LINK) // 1 LINK = 0.01 ETH

              const linkFactory = await ethers.getContractFactory("MockLinkToken", owner)
              const link = await linkFactory.deploy()

              const wrapperFactory = await ethers.getContractFactory("VRFV2PlusWrapper", owner)
              const wrapper = await wrapperFactory.deploy(
                  link.address,
                  linkEthFeed.address,
                  coordinator.address,
                  subscriptionId,
              )

              const consumerFactory = await ethers.getContractFactory(
                  "RandomNumberDirectFundingConsumerV2Plus",
                  consumerOwner
              )
              const consumer = await consumerFactory.deploy(link.address, wrapper.address)

              // configure wrapper
              const keyHash = networkConfig[chainId]["keyHash"]
              await wrapper
                  .connect(owner)
                  .setConfig(
                      wrapperGasOverhead,
                      coordinatorGasOverheadNative,
                      coordinatorGasOverheadLink,
                      coordinatorGasOverheadPerWord,
                      coordinatorNativePremiumPercentage,
                      coordinatorLinkPremiumPercentage,
                      keyHash,
                      maxNumWords,
                      stalenessSeconds,
                      fallbackWeiPerUnitLink,
                      fulfillmentFlatFeeNativePPM,
                      fulfillmentFlatFeeLinkDiscountPPM
                  )

              // fund subscription. The Wrapper's subscription id is 1
              await coordinator.connect(owner).fundSubscription(subscriptionId, oneHundredLink)
              await coordinator.connect(owner).addConsumer(subscriptionId, wrapper.address)

              return {
                  coordinator,
                  wrapper,
                  consumer,
                  link,
                  owner,
                  requester,
                  consumerOwner,
                  withdrawRecipient,
                  subscriptionId,
              }
          }

          describe("#requestRandomWords", async () => {
              describe("success", async () => {
                  it("Should successfully request a random number", async () => {
                      const { consumer, wrapper, coordinator, link, owner, consumerOwner } =
                          await loadFixture(deployRandomNumberConsumerFixture)
                      await fund(link, owner, consumer.address, oneHundredLink)
                      const numWords = 2
                      const gasLimit = 100_000
                      const price = estimateRequestPrice(gasLimit, numWords)
                      

                      // estimate price from wrapper side
                      const estimatedWrapperPrice = await wrapper.estimateRequestPrice(gasLimit, numWords, oneHundredGwei)

                      expect(price).to.eq(estimatedWrapperPrice)

                      const requestId = 1

                      await expect(
                          consumer
                              .connect(consumerOwner)
                              .requestRandomWords(gasLimit, 3, numWords, {
                                  gasPrice: oneHundredGwei,
                              })
                      )
                          .to.emit(coordinator, "RandomWordsRequested")
                          .to.emit(consumer, "RequestSent")
                          .withArgs(requestId, numWords, price)
                      expect(await consumer.lastRequestId()).to.equal(requestId)
                      expect(await consumer.getNumberOfRequests()).to.equal(1)

                      expect(await link.balanceOf(wrapper.address)).to.equal(price)
                      const { paid, fulfilled } = await consumer.s_requests(requestId)
                      expect(paid).to.equal(price)
                      expect(fulfilled).to.be.false
                  })

                  it("Should successfully request a random number and get a result", async () => {
                      const { consumer, wrapper, coordinator, link, owner, consumerOwner, subscriptionId } =
                          await loadFixture(deployRandomNumberConsumerFixture)
                      await fund(link, owner, consumer.address, oneHundredLink)
                      
                      // check initial balance of wrapper
                      const { balance: initialSubscriptionbalance } =
                          await coordinator.getSubscription(subscriptionId)
                      const gasLimit = 100_000
                      const numWords = 1
                      const price = estimateRequestPrice(gasLimit, numWords)

                      await consumer
                          .connect(consumerOwner)
                          .requestRandomWords(gasLimit, 3, numWords, {
                              gasPrice: oneHundredGwei,
                          })

                      const requestId = await consumer.lastRequestId()
                      const randomness = [123]

                      // fulfill the request (simulation)
                      await expect(
                          coordinator
                              .connect(owner)
                              .fulfillRandomWordsWithOverride(
                                  requestId,
                                  wrapper.address,
                                  randomness,
                                  {
                                      gasLimit: 1_000_000,
                                  }
                              )
                      )
                          .to.emit(coordinator, "RandomWordsFulfilled")
                          .to.emit(consumer, "RequestFulfilled")
                          .withArgs(requestId, randomness, BigNumber.from(price))

                      const { paid, fulfilled, randomWords } = await consumer.getRequestStatus(
                          requestId
                      )
                      expect(paid).to.equal(price)
                      expect(fulfilled).to.be.true
                      expect(randomWords.length).to.equal(randomness.length)
                      expect(randomWords.toString()).to.equal(randomness.toString())

                      // check final Wrapper final subscription balance
                      const { balance: finalSubscriptionbalance } =
                          await coordinator.getSubscription(subscriptionId)

                      console.log("price", price.toString())
                      console.log("paid", paid.toString())
                      console.log(
                          "wrapper balance",
                          (await link.balanceOf(wrapper.address)).toString()
                      )
                      console.log(
                          "initial subscription balance",
                          initialSubscriptionbalance.toString()
                      )
                      console.log("final subscription balance", finalSubscriptionbalance.toString())
                      const paidByWrapper = initialSubscriptionbalance.sub(finalSubscriptionbalance)
                      console.log("paid by wrapper", paidByWrapper.toString())
                      const wrapperPremium = paid.sub(paidByWrapper)
                      console.log("wrapperPremium", wrapperPremium.toString())
                      console.log("percentage", wrapperPremium.mul(100).div(paid).toString())
                  })

                  it("Should be able to request several random words", async () => {
                      const { consumer, wrapper, coordinator, link, owner, consumerOwner } =
                          await loadFixture(deployRandomNumberConsumerFixture)
                      await fund(link, owner, consumer.address, oneHundredLink)

                      const gasLimit = 250_000
                      const numWords = 7
                      const price = estimateRequestPrice(gasLimit, numWords)

                      await consumer
                          .connect(consumerOwner)
                          .requestRandomWords(gasLimit, 3, numWords, {
                              gasPrice: oneHundredGwei,
                          })

                      const requestId = await consumer.lastRequestId()
                      const randomness = [123, 4, 7, 9, 3554, 10547, 965]

                      // fulfill the request (simulation)
                      await expect(
                          coordinator
                              .connect(owner)
                              .fulfillRandomWordsWithOverride(
                                  requestId,
                                  wrapper.address,
                                  randomness,
                                  {
                                      gasLimit: 1_000_000,
                                  }
                              )
                      )
                          .to.emit(coordinator, "RandomWordsFulfilled")
                          .to.emit(consumer, "RequestFulfilled")
                          .withArgs(requestId, randomness, BigNumber.from(price))

                      const { paid, fulfilled, randomWords } = await consumer.getRequestStatus(
                          requestId
                      )
                      expect(paid).to.equal(price)
                      expect(fulfilled).to.be.true
                      expect(randomWords.length).to.equal(randomness.length)
                      expect(randomWords.toString()).to.equal(randomness.toString())
                  })
              })

              describe("error", async () => {
                  it("Cannot request randomness without funding wrapper", async () => {
                      const { consumer, consumerOwner } = await loadFixture(
                          deployRandomNumberConsumerFixture
                      )
                      await expect(
                          consumer.connect(consumerOwner).requestRandomWords(250_000, 3, 1, {
                              gasPrice: oneHundredGwei,
                          })
                      ).to.reverted
                  })

                  it("Cannot request more than maxNumWords ", async () => {
                      const { consumer, link, owner, consumerOwner } = await loadFixture(
                          deployRandomNumberConsumerFixture
                      )
                      await fund(link, owner, consumer.address, oneHundredLink)
                      const gasLimit = 100_000
                      const numWords = maxNumWords + 1

                      await expect(
                          consumer
                              .connect(consumerOwner)
                              .requestRandomWords(gasLimit, 3, numWords, {
                                  gasPrice: oneHundredGwei,
                              })
                      ).to.revertedWith("numWords too high")
                  })

                  it("Cannot fulfill if callback gasLimit too low ", async () => {
                      const { consumer, link, coordinator, wrapper, owner, consumerOwner } =
                          await loadFixture(deployRandomNumberConsumerFixture)
                      await fund(link, owner, consumer.address, oneHundredLink)
                      //100_000 not enough to fulfill the callback for 4 random words
                      const gasLimit = 100_000

                      await consumer.connect(consumerOwner).requestRandomWords(gasLimit, 3, 4, {
                          gasPrice: oneHundredGwei,
                      })

                      const requestId = await consumer.lastRequestId()
                      const randomness = [1, 2, 3, 4]

                      // fulfill the request (simulation)
                      await expect(
                          coordinator
                              .connect(owner)
                              .fulfillRandomWordsWithOverride(
                                  requestId,
                                  wrapper.address,
                                  randomness,
                                  {
                                      gasLimit: 1_000_000,
                                  }
                              )
                      )
                          .to.emit(coordinator, "RandomWordsFulfilled")
                          .to.emit(wrapper, "WrapperFulfillmentFailed")
                          .withArgs(requestId, consumer.address)
                  })
              })
          })
      })
