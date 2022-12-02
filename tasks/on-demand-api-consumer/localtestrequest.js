const { simulateRequest, buildRequest, getDecodedResultLog } = require('../../scripts/onDemandRequestSimulator')
const { VERIFICATION_BLOCK_CONFIRMATIONS, developmentChains } = require("../../helper-hardhat-config")
const { getNetworkConfig } = require('../utils')
const { deployOnDemandApiConsumer } = require('../../scripts/deployment/deployOnDemandApiConsumer')

task("on-demand-request", "Calls an On Demand API consumer contract to request external data")
    .addParam(
        "contract",
        "The address of the On Demand On Demand API Consumer contract that you want to call"
    ).addParam(
        "subid",
        "The billing subscription ID used to pay for the request"
    ).addOptionalParam(
        "gaslimit",
        "The maximum amount of gas that can be used to fulfill a request (defaults to 1,000,000)"
    ).setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name
        const subscriptionId = taskArgs.subid
        const gasLimit = parseInt(taskArgs.gaslimit ?? '1000000')
        const networkConfig = getNetworkConfig(network.name)

        if (networkConfig.chainId.toString() !== '31337') {
          throw Error('This only works on local testnet')
        }

        console.log('Simulating on demand request locally...')
        const { success, resultLog } = await simulateRequest('../../on-demand-request-config.js')
        console.log(resultLog)
        if (!success) {
          return
        }
        const request = await buildRequest('../../on-demand-request-config.js')

        const APIConsumer = await ethers.getContractFactory("OnDemandAPIConsumer")
        const { apiConsumerContract } = deployOnDemandApiConsumer(31337)

        console.log(
            "Requesting new data from On Demand API Consumer contract ",
            contractAddr,
            " on network ",
            networkId
        )

        await new Promise(async (resolve, reject) => {
            const requestTx = await apiConsumerContract.executeRequest(
                request.source,
                request.secrets,
                request.args,
                subscriptionId,
                gasLimit
            )

            const waitBlockConfirmations = developmentChains.includes(network.name)
                ? 1
                : VERIFICATION_BLOCK_CONFIRMATIONS
            console.log(`Waiting ${waitBlockConfirmations} blocks for transaction ${requestTx.hash} to be confirmed...`)
            const requestTxReceipt = await requestTx.wait(waitBlockConfirmations)

            setTimeout(reject(
                'A response not received within 5 minutes of the request being initiated and has been canceled. Your subscription was not charged. Please make a new request.'
            ), 300000)
            
            const requestId = requestTxReceipt.events[2].args.requestId
            console.log(`Request ${requestId} initiated`)

            console.log(`Waiting for fulfillment...`)

            apiConsumerContract.on(
                'OCRResponse',
                (result, err) => {
                    console.log(`Request ${requestId} fulfilled!`)
                    if (result !== '0x') {
                        console.log(
                            `Response represented as a hex string: ${result}\n${
                                getDecodedResultLog(
                                    require('../../on-demand-request-config'),
                                    result
                                )
                            }`
                        )
                    } else {
                        console.log(`Response error: ${Buffer.from(err.slice(2), 'hex')}`)
                    }
                    resolve()
                }
            )
        })
    })
module.exports = {}
