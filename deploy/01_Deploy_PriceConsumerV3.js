let { networkConfig, deployMock } = require('../helper-hardhat-config')

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy } = deployments
    const { deployer } = await getNamedAccounts()
    let chainId = await getChainId()
    let ethUsdPriceFeedAddress
    if (chainId == 31337) {
        ethUsdPriceFeedAddress = await deployMock('MockV3Aggregator', ['18', '200000000000000000000'])
    } else {
        ethUsdPriceFeedAddress = networkConfig[chainId]['ethUsdPriceFeed']
    }
    //Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    //Default one below is ETH/USD contract on Kovan
    console.log("----------------------------------------------------")
    console.log('Deploying PriceConsumerV3')
    const priceConsumerV3 = await deploy('PriceConsumerV3', {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true
    })
    console.log("PriceConsumerV3 deployed to: ", priceConsumerV3.address)
    console.log("Run Price Feed contract with command:")
    console.log("npx hardhat read-price-feed --contract " + priceConsumerV3.address + " --network " + networkConfig[chainId]['name'])
}
module.exports.tags = ['PriceConsumerV3']
