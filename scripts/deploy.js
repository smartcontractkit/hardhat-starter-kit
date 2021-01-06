async function main() {
    //Price Consumer - Deploy Price Feed Contract
    console.log("Deploying Price Feeds consumer contract")
    const PriceConsumerV3 = await ethers.getContractFactory("PriceConsumerV3")
    //defaulting price feed to Kovan ETH/USD, but you can choose whichever you want here https://docs.chain.link/docs/reference-contracts
    const priceConsumerV3 = await PriceConsumerV3.deploy('0x9326BFA02ADD2366b30bacB125260Af641031331')
    await priceConsumerV3.deployed()
    console.log("PriceConsumerV3 deployed to: ", priceConsumerV3.address)
    latestPrice = await priceConsumerV3.getLatestPrice()
    console.log("Current Price data : ", latestPrice.toString())
    console.log("Run Price Feed contract with command: npx hardhat read-price-feed --contract ",priceConsumerV3.address)
    
    //APIConsumer - deploy the API consumer contract to call any API
    console.log("Deploying API Consumer contract")
    const APIConsumer = await ethers.getContractFactory("APIConsumer")
    //default link token address to kovan, but you can change it to suit your environment
    const apiConsumer = await APIConsumer.deploy('0xa36085F69e2889c224210F603D836748e7dC0088')
    await apiConsumer.deployed()
    console.log("API Consumer deployed to: ", apiConsumer.address)
    console.log("Run the following to fund contract with LINK: npx hardhat fund-link --contract ",apiConsumer.address);
    console.log("Then run API Consumer contract with command: npx hardhat request-data --contract ",apiConsumer.address)


    //Random Number Consumer - Deploy contract to obtain Random Number
    console.log("Deploying Random Number Consumer contract")
    const RandomNumberConsumer = await ethers.getContractFactory("RandomNumberConsumer")
    //default settings to kovan, but you can change it to suit your environment
    //see https://docs.chain.link/docs/vrf-contracts#config
    const randomNumberConsumer = await RandomNumberConsumer.deploy('0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
                                                                   '0xa36085f69e2889c224210f603d836748e7dc0088',
                                                                   '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
                                                                   '100000000000000000')
    await randomNumberConsumer.deployed()
    console.log("Random Number Consumer deployed to: ", randomNumberConsumer.address)
    console.log("Run the following to fund contract with LINK: npx hardhat fund-link --contract ",randomNumberConsumer.address);
    console.log("Then run VRF Consumer contract with command: npx hardhat request-random-number --contract ",randomNumberConsumer.address)
    
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })