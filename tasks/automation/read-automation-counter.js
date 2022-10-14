task(
    "read-automation-counter",
    "Gets the value of the counter from the Counter contract used to demo Chainlink Automation"
)
    .addParam("contract", "The address of the Automation Counter contract that you want to query")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name

        const AutomationCounterContract = await ethers.getContractFactory("AutomationCounter")
        console.log(
            "Reading counter from Automation contract ",
            contractAddr,
            " on network ",
            networkId
        )

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]
        const automationCounterContract = await new ethers.Contract(
            contractAddr,
            AutomationCounterContract.interface,
            signer
        )
        await automationCounterContract.counter().then((data) => {
            console.log("Counter is: ", BigInt(data).toString())
        })
    })

module.exports = {}
