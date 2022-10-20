const { networkConfig } = require("../../helper-hardhat-config")
const { generateKeys } = require("../../scripts/generateKeys")

task("on-demand-request", "Calls an On Demand API Consumer Contract to request external data")
    .addParam(
        "contract",
        "The address of the On Demand On Demand API Consumer contract that you want to call"
    )
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract

        // TODO
    })
module.exports = {}
