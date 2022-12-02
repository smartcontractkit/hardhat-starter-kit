task('on-demand-read', 'Calls an On Demand API Consumer Contract to read data obtained from an external API')
    .addParam('contract', 'The address of the On Demand On Demand API Consumer contract that you want to call')
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name
        console.log('Reading data from On Demand API Consumer contract ', contractAddr, ' on network ', networkId)
        const APIConsumer = await ethers.getContractFactory('OnDemandAPIConsumer')

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        //Create connection to API Consumer Contract and call the createRequestTo function
        const apiConsumerContract = new ethers.Contract(contractAddr, APIConsumer.interface, signer)
        let latestRequestId = await apiConsumerContract.latestRequestId()
        let latestResponse = await apiConsumerContract.latestResponse()
        let responseStr = latestResponse.toString()

        console.log(`💾 On-chain data represented as a hex string: ${responseStr}`)

        const config = require('../../on-demand-request-config')
        if (config.expectedReturnType) {
            let decodedData
            switch (config.expectedReturnType) {
                case 'uint256':
                    decodedData = BigInt('0x' + responseStr.slice(2).slice(-64))
                    break
                case 'int256':
                    decodedData = signedInt256toBigInt('0x' + responseStr.slice(2).slice(-64))
                    break
                case 'string':
                    decodedData = Buffer.from(responseStr.slice(2), 'hex').toString()
                    break
                default:
                    const end = config.expectedReturnType
                    throw new Error(`incorrect expectedReturnType ${end}`)
            }
            console.log(`📒 On-chain data decoded as a ${config.expectedReturnType}: ${decodedData}`)
        }
    })

const signedInt256toBigInt = (hex) => {
    const binary = BigInt(hex).toString(2).padStart(256, '0')
    // if the first bit is 0, number is positive
    if (binary[0] === '0') {
        return BigInt(hex)
    }
    return -(BigInt(2) ** BigInt(255)) + BigInt(`0b${binary.slice(1)}`)
}

module.exports = {}
