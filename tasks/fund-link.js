
let { networkConfig, getNetworkIdFromName } = require('../helper-hardhat-config')

task("fund-link", "Funds a contract with LINK")
    .addParam("contract", "The address of the contract that requires LINK")
    .addOptionalParam("linkaddress", "Set the LINK token address")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        let networkId = await getNetworkIdFromName(network.name)
        console.log("Funding contract ", contractAddr, " on network ", network.name)
        let linkTokenAddress = networkConfig[networkId]['linkToken'] || taskArgs.linkaddress
        const LinkToken = await ethers.getContractFactory("LinkToken")

        //Fund with 1 LINK token
        const amount = web3.utils.toHex(1e18)

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        //Create connection to LINK token contract and initiate the transfer
        const linkTokenContract = new ethers.Contract(linkTokenAddress, LinkToken.interface, signer)
        var result = await linkTokenContract.transfer(contractAddr, amount).then(function (transaction) {
            console.log('Contract ', contractAddr, ' funded with 1 LINK. Transaction Hash: ', transaction.hash)
        })
    })

module.exports = {}

