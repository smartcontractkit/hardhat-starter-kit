task(
    "request-random-number",
    "Requests a random number for a Chainlink VRF enabled smart contract using the Subscription method"
)
    .addParam("contract", "The address of the VRF Consumer contract that you want to call")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name
        console.log(
            "Requesting a random number using VRF consumer contract ",
            contractAddr,
            " on network ",
            networkId
        )
        const RandomNumberConsumerV2 = await ethers.getContractFactory("RandomNumberConsumerV2")

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        //Create connection to VRF Contract and call the getRandomNumber function
        const vrfConsumerContractV2 = new ethers.Contract(
            contractAddr,
            RandomNumberConsumerV2.interface,
            signer
        )
        const transaction = await vrfConsumerContractV2.requestRandomWords()
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
            "yarn hardhat read-random-number --contract " +
                contractAddr +
                " --network " +
                network.name
        )
    })

module.exports = {}
