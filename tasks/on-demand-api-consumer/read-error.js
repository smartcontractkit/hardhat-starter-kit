task(
  "on-demand-read-error",
  "Calls an On Demand API Consumer Contract to read a reported error"
)
  .addParam(
      "contract",
      "The address of the On Demand On Demand API Consumer contract that you want to call"
  )
  .setAction(async (taskArgs) => {
      const contractAddr = taskArgs.contract
      const networkId = network.name
      console.log(
          "Reading error data from On Demand API Consumer contract ",
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
      let latestError = await apiConsumerContract.latestError()

      console.log(`💾 On-chain error message: ${Buffer.from(latestError.slice(2), 'hex').toString()}`)
  })

module.exports = {}
