task(
    "on-demand-read",
    "Calls an On Demand API Consumer Contract to read data obtained from an external API"
)
    .addParam(
        "contract",
        "The address of the On Demand On Demand API Consumer contract that you want to call"
    )
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        // TODO
    })

module.exports = {}
