let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = await getChainId()
    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        const MockV3Aggregator = await deployments.get('EthUsdAggregator')
        ethUsdPriceFeedAddress = MockV3Aggregator.address
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
    }
    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one below is ETH/USD contract on Kovan
    const priceConsumerV3 = await deploy('PriceConsumerV3', {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true
    })
    log("Run Price Feed contract with command:")
    log("npx hardhat read-price-feed --contract " + priceConsumerV3.address + " --network " + networkConfig[chainId]['name'])
}

module.exports.tags = ['all', 'feed']
