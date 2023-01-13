const { assert } = require("chai")

task(
    "read-random-number-direct-funding",
    "Reads the random number returned to a contract by Chainlink VRF Direct Funding method"
)
    .addParam("contract", "The address of the VRF contract that you want to read")
    .addOptionalParam("requestid", "Request id")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const requestId = taskArgs.requestid
        const networkId = network.name
        console.log("Reading data from VRF contract ", contractAddr, " on network ", networkId)
        const RandomNumberConsumerV2 = await ethers.getContractFactory(
            "RandomNumberDirectFundingConsumerV2"
        )

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        //Create connection to VRF Contract and check for returned random values
        const vrfConsumerContractV2 = new ethers.Contract(
            contractAddr,
            RandomNumberConsumerV2.interface,
            signer
        )

        const chosentRequestId = requestId || (await vrfConsumerContractV2.lastRequestId())
        const { fulfilled, randomWords } = await vrfConsumerContractV2.getRequestStatus(
            chosentRequestId
        )

        try {
            assert(fulfilled === true, `requestId ${chosentRequestId} not fulfilled`)
            assert(randomWords.length > 0, "randomness not received")
            console.log(`Random Numbers are: ${randomWords.toString()}`)
        } catch (error) {
            if (["hardhat", "localhost", "ganache"].includes(network.name)) {
                console.log(
                    "You'll have to manually update the value since you're on a local chain!"
                )
            } else {
                console.log(
                    `Open your contract in the block explorer and check in internal transactions if the callback has been made`
                )
            }
        }
    })

module.exports = {}
