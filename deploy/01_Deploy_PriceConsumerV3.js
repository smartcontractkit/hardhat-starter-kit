module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
  }) => {
    const {deploy} = deployments;
    //const deployer = await getNamedAccounts();

    //Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    const PRICE_FEED_CONTRACT="0x9326BFA02ADD2366b30bacB125260Af641031331";

    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];

    //console.log('signer:',signer.address)
    //console.log('deployer:',deployer)
    console.log("----------------------------------------------------")
    console.log('Deploying PriceConsumerV3');
      const priceConsumerV3 = await deploy('PriceConsumerV3', {
      from: signer.address,
      gasLimit: 4000000,
      args: [PRICE_FEED_CONTRACT],
    });

    //await priceConsumerV3.deployed()
    console.log("PriceConsumerV3 deployed to: ", priceConsumerV3.address)
    console.log("Run Price Feed contract with command:")
    console.log("npx hardhat read-price-feed --contract ",priceConsumerV3.address)
  };