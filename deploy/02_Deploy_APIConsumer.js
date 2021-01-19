module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
  }) => {
    const {deploy} = deployments;
    
    //LINK Token address set to Kovan address. Can get other values at https://docs.chain.link/docs/link-token-contracts
    const LINK_TOKEN_ADDR="0xa36085F69e2889c224210F603D836748e7dC0088";

    const accounts = await hre.ethers.getSigners();
    const signer = accounts[0];

  
    console.log('Deploying APIConsumer');
      const apiConsumer = await deploy('APIConsumer', {
      from: signer.address,
      gasLimit: 4000000,
      args: [LINK_TOKEN_ADDR],
    });

    console.log("APIConsumer deployed to: ", apiConsumer.address)
    console.log("Run the following to fund contract with LINK: npx hardhat fund-link --contract ",apiConsumer.address);
    console.log("Then run API Consumer contract with command: npx hardhat request-data --contract ",apiConsumer.address)

  };