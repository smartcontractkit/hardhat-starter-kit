const { networkConfig, developmentChains } = require("../../helper-hardhat-config")

task("read-price-feed", "Gets the latest price from a Chainlink Price Feed")
    .addParam("contract", "The address of the Price Feed consumer contract that you want to read")
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name
        const PriceFeedConsumerContract = await ethers.getContractFactory("PriceConsumerV3")
        let priceFeedConsumerContract;

        console.log(`Reading data from Price Feed consumer contract ${contractAddr} on network ${networkId}`)

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        const code = await signer.provider.getCode(contractAddr);

        if (code === "0x") {
            // contractAddr is not a contract account
            console.log(`The contract with address ${contractAddr} does not exist on chain ${networkId}. Deploying it...`)

            let priceFeedAddress;
            if (developmentChains.includes(networkId)) {
                const DECIMALS = "18"
                const INITIAL_PRICE = "200000000000000000000"
                const mockV3AggregatorFactory = await ethers.getContractFactory("MockV3Aggregator")
                const mockV3Aggregator = await mockV3AggregatorFactory.deploy(DECIMALS, INITIAL_PRICE)
                priceFeedAddress = mockV3Aggregator.address;
            } else {
                priceFeedAddress = networkConfig[network.config.chainId]["ethUsdPriceFeed"]
            }

            priceFeedConsumerContract = await PriceFeedConsumerContract.deploy(priceFeedAddress)
        } else {
            priceFeedConsumerContract = await new ethers.Contract(
                contractAddr,
                PriceFeedConsumerContract.interface,
                signer
            )
        }

        await priceFeedConsumerContract.getLatestPrice().then((data) => {
            console.log("Price is: ", BigInt(data).toString())
        })
    })

module.exports = {}
