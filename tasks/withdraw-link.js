let { networkConfig, getNetworkIdFromName } = require('../helper-hardhat-config')

task("withdraw-link", "Returns any LINK left in deployed contract")
    .addParam("contract", "The address of the contract")
    .addOptionalParam("linkaddress", "Set the LINK token address")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        let networkId = await getNetworkIdFromName(network.name)

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        //First, lets see if there is any LINK to withdraw
        let linkTokenAddress = networkConfig[networkId]['linkToken'] || taskArgs.linkaddress
        const LinkToken = await ethers.getContractFactory("LinkToken")
        const linkTokenContract = new ethers.Contract(linkTokenAddress, LinkToken.interface, signer)
        let balanceHex = await linkTokenContract.balanceOf(contractAddr);
        let balance = await web3.utils.toBN(balanceHex._hex).toString(); 
        console.log('LINK balance of contract: ' + contractAddr + " is " + balance / Math.pow(10,18));

        if (balance > 0) {
            //Could also be Any-API contract, but in either case the function signature is the same, so we just need to use one
            const RandomNumberConsumer = await ethers.getContractFactory("RandomNumberConsumer")

            //Create connection to Consumer Contract and call the withdraw function
            const ConsumerContract = new ethers.Contract(contractAddr, RandomNumberConsumer.interface, signer)
            let result = await ConsumerContract.withdrawLink().then(function (transaction) {
                console.log('All LINK withdrew from contract ' + contractAddr, '. Transaction Hash: ', transaction.hash)
            })
        } else {
            console.log("Contract doesn't have any LINK to withdraw")
        }

    })

module.exports = {}

