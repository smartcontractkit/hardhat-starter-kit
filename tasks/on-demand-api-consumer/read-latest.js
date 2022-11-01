task(
    "on-demand-read",
    "Calls an On Demand API Consumer Contract to read data obtained from an external API"
)
    .addParam(
        "contract",
        "The address of the On Demand On Demand API Consumer contract that you want to call"
    )
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name
        console.log(
            "Reading data from On Demand API Consumer contract ",
            contractAddr,
            " on network ",
            networkId
        )
        const APIConsumer = await ethers.getContractFactory("OnDemandAPIConsumer")

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        //Create connection to API Consumer Contract and call the createRequestTo function
        const apiConsumerContract = new ethers.Contract(contractAddr, APIConsumer.interface, signer)
        let latestRequestId = await apiConsumerContract.latestRequestId()
        let latestResponse = await apiConsumerContract.latestResponse()
        let latestError = await apiConsumerContract.latestError()
        console.log("Data is: ", latestResponse.toString())
    })

module.exports = {}
