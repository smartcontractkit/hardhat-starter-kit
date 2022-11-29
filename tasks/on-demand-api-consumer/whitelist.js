const { networkConfig } = require("../../helper-hardhat-config")

task("on-demand-whitelist", "Whitelists a wallet to be able to make on-demand requests")
    .addParam(
        "wallet",
        "The address of the wallet to whitelist for making On-Demand requests"
    )
    .setAction(async (taskArgs) => {
        const walletAddr = taskArgs.wallet

        const oracle = await ethers.getContractAt("OCR2DROracle", networkConfig[5]["ocr2odOracle"])

        const whitelistTx = await oracle.addSender(walletAddr)

        console.log(whitelistTx)

        console.log('Sender wallet whitelisted')
    })
module.exports = {}