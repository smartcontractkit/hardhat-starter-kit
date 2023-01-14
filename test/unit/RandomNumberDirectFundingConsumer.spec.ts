import { assert, expect } from "chai"
import { BigNumber } from "ethers"
import { network, deployments, ethers } from "hardhat"
import { developmentChains, networkConfig } from "../../helper-hardhat-config"
import {
    RandomNumberDirectFundingConsumerV2,
    VRFCoordinatorV2Mock,
    VRFV2Wrapper,
    LinkToken,
} from "../../typechain"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("RandomNumberDirectFundingConsumer Unit Tests", async function () {
          let randomNumberConsumerV2: RandomNumberDirectFundingConsumerV2
          let vrfCoordinatorV2Mock: VRFCoordinatorV2Mock
          let linkToken: LinkToken
          let wrapper: VRFV2Wrapper

          const pointOneLink = BigNumber.from("100000000000000000") // 0.1
          const pointZeroZeroThreeLink = BigNumber.from("3000000000000000") // 0.003
          const oneHundredLink = BigNumber.from("100000000000000000000") // 100 LINK
          const oneHundredGwei = BigNumber.from("100000000000")

          // Configuration

          // This value is the worst-case gas overhead from the wrapper contract under the following
          // conditions, plus some wiggle room:
          //   - 10 words requested
          //   - Refund issued to consumer
          const wrapperGasOverhead = BigNumber.from(60_000)
          const coordinatorGasOverhead = BigNumber.from(52_000)
          const wrapperPremiumPercentage = 10
          const maxNumWords = 10
          const weiPerUnitLink = pointZeroZeroThreeLink
          const flatFee = pointOneLink

          const fund = async (receiver: string, amount: BigNumber | number) => {
              await expect(linkToken.transfer(receiver, amount)).to.not.be.reverted
          }

          // This should match implementation in VRFV2Wrapper::calculateGasPriceInternal
          const calculatePrice = (
              gasLimit: BigNumber | number,
              _wrapperGasOverhead = wrapperGasOverhead,
              _coordinatorGasOverhead = coordinatorGasOverhead,
              _gasPriceWei = oneHundredGwei,
              _weiPerUnitLink = weiPerUnitLink,
              _wrapperPremium = wrapperPremiumPercentage,
              _flatFee = flatFee
          ) => {
              const totalGas = BigNumber.from(0)
                  .add(gasLimit)
                  .add(_wrapperGasOverhead)
                  .add(_coordinatorGasOverhead)
              const baseFee = BigNumber.from("1000000000000000000")
                  .mul(_gasPriceWei)
                  .mul(totalGas)
                  .div(_weiPerUnitLink)
              const withPremium = baseFee.mul(BigNumber.from(100).add(_wrapperPremium)).div(100)
              return withPremium.add(_flatFee)
          }

          beforeEach(async () => {
              await deployments.fixture(["mocks", "vrf"])
              randomNumberConsumerV2 = await ethers.getContract(
                  "RandomNumberDirectFundingConsumerV2"
              )
              vrfCoordinatorV2Mock = await ethers.getContract("VRFCoordinatorV2Mock")
              wrapper = await ethers.getContract("VRFV2Wrapper")
              linkToken = await ethers.getContract("LinkToken")

              // fund subscription
              const subscriptionId = await wrapper.SUBSCRIPTION_ID()
              await vrfCoordinatorV2Mock.fundSubscription(subscriptionId, oneHundredLink)
          })

          it("Should successfully request a random number", async () => {
              await fund(randomNumberConsumerV2.address, oneHundredLink)
              const gasLimit = 100_000
              const price = calculatePrice(gasLimit)

              // estimate price from wrapper side
              const estimatedWrapperPrice = await wrapper.calculateRequestPrice(gasLimit, {
                  gasPrice: oneHundredGwei,
              })
              // TODO: fix price?
              //   expect(price).to.eq(estimatedWrapperPrice)

              const requestId = 1
              const numWords = 1

              await expect(
                  randomNumberConsumerV2.requestRandomWords(gasLimit, 3, numWords, {
                      gasPrice: oneHundredGwei,
                  })
              )
                  .to.emit(vrfCoordinatorV2Mock, "RandomWordsRequested")
                  .to.emit(randomNumberConsumerV2, "RequestSent")
          })

          it("Should successfully request a random number and get a result", async () => {
              await fund(randomNumberConsumerV2.address, oneHundredLink)

              const subscriptionId = await wrapper.SUBSCRIPTION_ID()
              const { balance: initialSubscriptionbalance } =
                  await vrfCoordinatorV2Mock.getSubscription(subscriptionId)

              const gasLimit = 100_000
              const price = calculatePrice(gasLimit)
              const numWords = 1

              await randomNumberConsumerV2.requestRandomWords(gasLimit, 3, numWords, {
                  gasPrice: oneHundredGwei,
              })
              const requestId = await randomNumberConsumerV2.lastRequestId()
              const randomness = [123]

              // simulate callback from the oracle network
              await expect(
                  vrfCoordinatorV2Mock.fulfillRandomWordsWithOverride(
                      requestId,
                      wrapper.address,
                      randomness,
                      {
                          gasLimit: 1_000_000,
                      }
                  )
              )
                  .to.emit(vrfCoordinatorV2Mock, "RandomWordsFulfilled")
                  .to.emit(randomNumberConsumerV2, "RequestFulfilled")
              //   .withArgs(requestId, randomness, BigNumber.from(price))

              const { paid, fulfilled, randomWords } =
                  await randomNumberConsumerV2.getRequestStatus(requestId)
              //   expect(paid).to.equal(price)
              expect(fulfilled).to.be.true
              expect(randomWords.length).to.equal(randomness.length)
              expect(randomWords.toString()).to.equal(randomness.toString())

              // check final Wrapper final subscription balance
              const { balance: finalSubscriptionbalance } =
                  await vrfCoordinatorV2Mock.getSubscription(subscriptionId)
              console.log("price", price.toString())
              console.log("paid", paid.toString())
              console.log(
                  "wrapper balance",
                  (await linkToken.balanceOf(wrapper.address)).toString()
              )
              console.log("initial subscription balance", initialSubscriptionbalance.toString())
              console.log("final subscription balance", finalSubscriptionbalance.toString())
              const paidByWrapper = initialSubscriptionbalance.sub(finalSubscriptionbalance)
              console.log("paid by wrapper", paidByWrapper.toString())
              const wrapperPremium = paid.sub(paidByWrapper)
              console.log("wrapperPremium", wrapperPremium.toString())
              console.log("percentage", wrapperPremium.mul(100).div(paid).toString())
          })

          it("Should be able to request several random words", async () => {
              await fund(randomNumberConsumerV2.address, oneHundredLink)

              const gasLimit = 250_000
              const price = calculatePrice(gasLimit)
              const numWords = 7

              await randomNumberConsumerV2.requestRandomWords(gasLimit, 3, numWords, {
                  gasPrice: oneHundredGwei,
              })

              const requestId = await randomNumberConsumerV2.lastRequestId()
              const randomness = [123, 4, 7, 9, 3554, 10547, 965]

              await expect(
                  vrfCoordinatorV2Mock.fulfillRandomWordsWithOverride(
                      requestId,
                      wrapper.address,
                      randomness,
                      {
                          gasLimit: 1_000_000,
                      }
                  )
              )
                  .to.emit(vrfCoordinatorV2Mock, "RandomWordsFulfilled")
                  .to.emit(randomNumberConsumerV2, "RequestFulfilled")
              //   .withArgs(requestId, randomness, BigNumber.from(price))

              const { paid, fulfilled, randomWords } =
                  await randomNumberConsumerV2.getRequestStatus(requestId)
              //   expect(paid).to.equal(price)
              expect(fulfilled).to.be.true
              expect(randomWords.length).to.equal(randomness.length)
              expect(randomWords.toString()).to.equal(randomness.toString())
          })

          describe("error", async () => {
              it("Cannot request randomness without funding wrapper", async () => {
                  await expect(
                      randomNumberConsumerV2.requestRandomWords(250_000, 3, 1, {
                          gasPrice: oneHundredGwei,
                      })
                  ).to.reverted
              })
              it("Cannot request more than maxNumWords ", async () => {
                  await fund(randomNumberConsumerV2.address, oneHundredLink)
                  const gasLimit = 100_000
                  const numWords = maxNumWords + 1

                  await expect(
                      randomNumberConsumerV2.requestRandomWords(gasLimit, 3, numWords, {
                          gasPrice: oneHundredGwei,
                      })
                  ).to.revertedWith("numWords too high")
              })
              it("Cannot fulfill if callback gasLimit too low ", async () => {
                  await fund(randomNumberConsumerV2.address, oneHundredLink)
                  //100_000 not enough to fulfill the callback for 4 random words
                  const gasLimit = 100_000

                  await randomNumberConsumerV2.requestRandomWords(gasLimit, 3, 4, {
                      gasPrice: oneHundredGwei,
                  })

                  const requestId = await randomNumberConsumerV2.lastRequestId()
                  const randomness = [1, 2, 3, 4]

                  // fulfill the request (simulation)f
                  await expect(
                      vrfCoordinatorV2Mock.fulfillRandomWordsWithOverride(
                          requestId,
                          wrapper.address,
                          randomness,
                          {
                              gasLimit: 1_000_000,
                          }
                      )
                  )
                      .to.emit(vrfCoordinatorV2Mock, "RandomWordsFulfilled")
                      .to.emit(wrapper, "WrapperFulfillmentFailed")
                      .withArgs(requestId, randomNumberConsumerV2.address)
              })
          })
      })
