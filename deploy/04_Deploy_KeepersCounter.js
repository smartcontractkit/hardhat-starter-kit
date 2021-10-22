let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    let keepersUpdateInterval = networkConfig[chainId]['keepersUpdateInterval']
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one below is ETH/USD contract on Kovan
    const keepersCounter = await deploy('Counter', {
        from: deployer,
        args: [keepersUpdateInterval],
        log: true
    })
    log("Head to https://keepers.chain.link/ to register your contract for upkeeps. Then run the following command to track the counter updates")
    log("npx hardhat read-keepers-counter --contract " + keepersCounter.address + " --network " + networkConfig[chainId]['name'])
    log("----------------------------------------------------")

}

module.exports.tags = ['all', 'keepers']
