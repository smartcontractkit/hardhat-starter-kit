task(
    "request-random-number-direct-funding",
    "Requests a random number for a Chainlink VRF enabled smart contract using the Direct Funding method"
)
    .addParam("contract", "The address of the VRF Consumer contract that you want to call")
    .addParam(
        "callbackgaslimit",
        "The maximum amount of gas to pay for completing the callback VRF function"
    )
    .addParam(
        "requestconfirmations",
        "The number of block confirmations the VRF service will wait to respond"
    )
    .addParam("numwords", "The number of random numbers to request")
    .setAction(async (taskArgs, hre) => {
        const {
            contract: contractAddr,
            callbackgaslimit: callbackGasLimit,
            requestconfirmations: requestConfirmations,
            numwords: numWords,
        } = taskArgs
        const networkId = network.name
        console.log(
            "Requesting a random number using VRF consumer contract ",
            contractAddr,
            " on network ",
            networkId
        )
        const RandomNumberConsumerV2 = await hre.ethers.getContractFactory(
            "RandomNumberDirectFundingConsumerV2"
        )

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        //Create connection to VRF Contract and call the getRandomNumber function
        const vrfConsumerContractV2 = await RandomNumberConsumerV2.attach(contractAddr, signer)

        const transaction = await vrfConsumerContractV2.requestRandomWords(
            callbackGasLimit,
            requestConfirmations,
            numWords,
            {
                gasLimit: 1000000,
            }
        )
        await transaction.wait()
        const requestId = await vrfConsumerContractV2.lastRequestId()
        console.log(
            "Contract ",
            contractAddr,
            " random number request successfully called. Transaction Hash: ",
            transaction.hash,
            " requestId: ",
            requestId.toString()
        )
        console.log("Run the following to read the returned random number:")
        console.log(
            "yarn hardhat read-random-number-direct-funding --contract " +
                contractAddr +
                " --requestid " +
                requestId.toString() +
                " --network " +
                network.name
        )
    })

module.exports = {}
