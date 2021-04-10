const DECIMALS = '18'
const INITIAL_PRICE = '200000000000000000000'

module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId
}) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    let chainId = await getChainId()
    let ethUsdPriceFeedAddress
    // If we are on a local development network, we need to deploy mocks!
    if (chainId == 31337) {
        log("Local network deteteched! Deploying mocks...")
        linkToken = await deploy('LinkToken', { from: deployer })
        await deploy('MockV3Aggregator', { from: deployer, args: [DECIMALS, INITIAL_PRICE] })
        await deploy('VRFCoordinatorMock', { from: deployer, args: [linkToken.address] })
        await deploy('MockOracle', { from: deployer, args: [linkToken.address] })
        log("Mocks Deployed!")
        log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
        log("You are deploying to a local network, you'll need a local network running to interact")
        log("Please run `npx hardhat node` to interact with the deployed smart contracts!")
        log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    }
}
module.exports.tags = ['Mocks']
