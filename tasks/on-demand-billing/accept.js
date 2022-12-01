const { getNetworkConfig } = require('../utils')
const {
    VERIFICATION_BLOCK_CONFIRMATIONS,
    developmentChains
} = require("../../helper-hardhat-config")

task(
    'on-demand-accept-sub',
    'Request ownership of an On-Demand subscription be transferred to a new address'
).addParam(
    "subid",
    "Subscription ID"
).setAction(async (taskArgs) => {
    const networkConfig = getNetworkConfig(network.name)

    const subscriptionId = taskArgs.subid

    const RegistryFactory = await ethers.getContractFactory('OCR2DRRegistry')
    const registry = await RegistryFactory.attach(networkConfig['ocr2odOracleRegistry'])

    let preSubInfo
    try {
        preSubInfo = await registry.getSubscription(subscriptionId)
    } catch (error) {
        if (error.errorName === 'InvalidSubscription') {
            throw Error(`Subscription ID "${subscriptionId}" is invalid or does not exist`)
        }
        throw error
    }

    console.log(`Accepting ownership of subscription ${subscriptionId}`)
    const acceptTx = await registry.acceptSubscriptionOwnerTransfer(subscriptionId)

    const waitBlockConfirmations = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    console.log(`Waiting ${waitBlockConfirmations} blocks for transaction ${acceptTx.hash} to be confirmed...`)
    await acceptTx.wait(waitBlockConfirmations)

    const signerAddr = (await ethers.getSigners())[0].address

    console.log(`Ownership of subscription ${subscriptionId} transferred to ${signerAddr}`)

    let postSubInfo = await registry.getSubscription(subscriptionId)

    console.log(`Subscription ${subscriptionId} owner: ${postSubInfo[1]}`)
    console.log(`Balance: ${ethers.utils.formatEther(postSubInfo[0])} LINK`)
    console.log(`Authorized consumer contracts: ${postSubInfo[2].length}`)
})