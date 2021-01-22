module.exports = async ({
    getNamedAccounts,
    deployments,
    getChainId,
    getUnnamedAccounts,
  }) => {
    const {deploy} = deployments;
    const {deployer} = await getNamedAccounts()
    
    //LINK Token address set to Kovan address. Can get other values at https://docs.chain.link/docs/link-token-contracts
    const LINK_TOKEN_ADDR="0xa36085F69e2889c224210F603D836748e7dC0088";

    console.log("----------------------------------------------------")
    console.log('Deploying APIConsumer');
      const apiConsumer = await deploy('APIConsumer', {
      from: deployer,
      gasLimit: 4000000,
      args: [LINK_TOKEN_ADDR],
    });

    console.log("APIConsumer deployed to: ", apiConsumer.address)
    console.log("Run the following command to fund contract with LINK:")
    console.log("npx hardhat fund-link --contract ",apiConsumer.address);
    console.log("Then run API Consumer contract with following command:")
    console.log("npx hardhat request-data --contract ",apiConsumer.address)

  };