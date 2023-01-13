const { networkConfig } = require("../helper-hardhat-config")

task("balance", "Prints an account's balances of native and LINK tokens")
    .addParam("account", "The account's address")
    .addOptionalParam("linkaddress", "Set the LINK token address")
    .setAction(async (taskArgs) => {
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        const account = ethers.utils.getAddress(taskArgs.account)
        const networkId = network.config.chainId
        const provider = signer.provider

        // native token
        const balance = await provider.getBalance(account)

        // fetch link balance
        const linkTokenAddress = networkConfig[networkId]["linkToken"] || taskArgs.linkaddress
        const LinkToken = await ethers.getContractFactory("LinkToken")
        const linkTokenContract = await LinkToken.attach(linkTokenAddress)
        const linkBalance = await linkTokenContract.balanceOf(account)

        console.log(ethers.utils.formatEther(balance), "ETH")
        console.log(ethers.utils.formatEther(linkBalance), "LINK")
    })

module.exports = {}
