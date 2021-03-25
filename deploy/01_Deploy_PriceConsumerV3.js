module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
}) => {
    const { deploy } = deployments
    const { deployer, EthUsdPriceFeed } = await getNamedAccounts()

    //Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    //Default one below is ETH/USD contract on Kovan

    console.log("----------------------------------------------------")
    console.log('Deploying PriceConsumerV3')
    const priceConsumerV3 = await deploy('PriceConsumerV3', {
        from: deployer,
        gasLimit: 4000000,
        args: [EthUsdPriceFeed],
    })

    //await priceConsumerV3.deployed()
    console.log("PriceConsumerV3 deployed to: ", priceConsumerV3.address)
    console.log("Run Price Feed contract with command:")
    console.log("npx hardhat read-price-feed --contract ", priceConsumerV3.address)
}
