task(
  "read-keepers-counter",
  "Gets the value of the counter from the Counter contract used to demo Chainlink Keepers"
)
  .addParam("contract", "The address of the Price Feed consumer contract that you want to read")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    const networkId = network.name

    const KeepersCounterContract = await ethers.getContractFactory("KeepersCounter")
    console.log("Reading counter from Keepers contract ", contractAddr, " on network ", networkId)

    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const keepersCounterContract = await new ethers.Contract(
      contractAddr,
      KeepersCounterContract.interface,
      signer
    )
    await keepersCounterContract.counter().then((data) => {
      console.log("Counter is: ", BigInt(data).toString())
    })
  })

module.exports = {}
