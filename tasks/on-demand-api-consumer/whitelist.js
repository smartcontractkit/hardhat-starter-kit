const { networkConfig, developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../../helper-hardhat-config")
const { getNetworkConfig } = require("../utils")

task("on-demand-whitelist", "Whitelists a wallet to be able to make on-demand requests")
    .addParam(
        "wallet",
        "The address of the wallet to whitelist for making On-Demand requests"
    )
    .setAction(async (taskArgs) => {
        const walletAddr = taskArgs.wallet
        const networkConfig = getNetworkConfig(network.name)

        const oracle = await ethers.getContractAt("OCR2DROracle", networkConfig["ocr2odOracle"])

        console.log(`Whitelisting sender wallet ${walletAddr} for OCR2DROracle ${networkConfig["ocr2odOracle"]}`)
        const whitelistTx = await oracle.addSender(walletAddr)
        const waitBlockConfirmations = developmentChains.includes(network.name)
            ? 1
            : VERIFICATION_BLOCK_CONFIRMATIONS
        console.log(`Waiting ${waitBlockConfirmations} blocks for transaction ${whitelistTx.hash} to be confirmed...`)
        await whitelistTx.wait(waitBlockConfirmations)

        console.log(`Sender wallet ${walletAddr} whitelisted for OCR2DROracle ${networkConfig["ocr2odOracle"]}`)
    })
module.exports = {}