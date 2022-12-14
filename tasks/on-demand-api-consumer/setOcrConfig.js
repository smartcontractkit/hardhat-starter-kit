const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../../helper-hardhat-config")
const { getNetworkConfig } = require("../utils")

task("on-demand-set-ocr-config", "Sets the OCR config using values from on-demand-request.json")
    .setAction(async () => {
        const networkConfig = getNetworkConfig(network.name)

        const oracleFactory = await ethers.getContractFactory("OCR2DROracle")
        const oracle = oracleFactory.attach(networkConfig["ocr2odOracle"])
    
        const ocrConfig = require("../../OCR2DROracleConfig.json")
        console.log(`Setting oracle OCR config for oracle ${networkConfig["ocr2odOracle"]}`)
        const setConfigTx = await oracle.setConfig(
            ocrConfig.signers,
            ocrConfig.transmitters,
            ocrConfig.f,
            ocrConfig.onchainConfig,
            ocrConfig.offchainConfigVersion,
            ocrConfig.offchainConfig
        )
    
        const waitBlockConfirmations = developmentChains.includes(network.name)
            ? 1
            : VERIFICATION_BLOCK_CONFIRMATIONS
        console.log(`Waiting ${waitBlockConfirmations} blocks for transaction ${setConfigTx.hash} to be confirmed...`)
        await setConfigTx.wait(waitBlockConfirmations)
    
        console.log(`OCR2Oracle config set for oracle ${oracle.address} on ${networkConfig.name}`)
    })
module.exports = {}