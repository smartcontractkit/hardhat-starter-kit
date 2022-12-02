const { networkConfig } = require("../../helper-hardhat-config")

task("request-data", "Calls an API Consumer Contract to request external data")
    .addParam("contract", "The address of the API Consumer contract that you want to call")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        let networkId = network.config.chainId
        console.log("Calling API Consumer contract ", contractAddr, " on network ", network.name)
        const APIConsumer = await ethers.getContractFactory("APIConsumer")

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        //Create connection to API Consumer Contract and call the createRequestTo function
        const apiConsumerContract = new ethers.Contract(contractAddr, APIConsumer.interface, signer)
        var result = await apiConsumerContract.requestVolumeData()
        console.log(
            "Contract ",
            contractAddr,
            " external data request successfully called. Transaction Hash: ",
            result.hash
        )
        console.log("Run the following to read the returned result:")
        console.log(
            "npx hardhat read-data --contract " + contractAddr + " --network " + network.name
        )
    })
module.exports = {}
