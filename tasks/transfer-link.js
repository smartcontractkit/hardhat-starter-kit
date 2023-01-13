const { BigNumber } = require("ethers")
const { networkConfig } = require("../helper-hardhat-config")

task("transfer-link", "Transfer LINK tokens to a recipient")
    .addParam(
        "recipient",
        "The address of the EOA or contract account that will receive your LINK tokens"
    )
    .addParam("amount", "Amount in Juels. 1LINK=10**18 JUELS")
    .addOptionalParam("linkaddress", "Set the LINK token address")
    .setAction(async (taskArgs) => {
        const { recipient: recipientAddress, amount } = taskArgs
        const networkId = network.config.chainId

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        const linkTokenAddress = networkConfig[networkId]["linkToken"] || taskArgs.linkaddress
        const LinkToken = await ethers.getContractFactory("LinkToken")
        const linkTokenContract = await LinkToken.attach(linkTokenAddress)
        console.log("linktokenaddress", linkTokenAddress)
        const balance = await linkTokenContract.balanceOf(signer.address)
        console.log(
            `LINK balance of sender ${signer.address} is + ${ethers.utils.formatEther(balance)}`
        )
        const amountBN = BigNumber.from(amount)
        if (balance.gte(amountBN)) {
            const result = await linkTokenContract.transfer(recipientAddress, amount)
            await result.wait()
            console.log(
                `${ethers.utils.formatEther(amountBN)} LINK where sent from sender ${
                    signer.address
                } to ${recipientAddress}.Transaction Hash: ${result.hash}`
            )
        } else {
            console.log(
                `Sender doesn't have enough LINK. Current balance is ${ethers.utils.formatEther(
                    balance
                )} LINK and transfer amount is ${ethers.utils.formatEther(amount)} LINK`
            )
        }
    })

module.exports = {}
