module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId,
  getUnnamedAccounts,
}) => {
  const { deploy } = deployments
  const { deployer, LINK, VrfCoordinator, KeyHash, Fee } = await getNamedAccounts()
  //LINK Token address set to Kovan address. Can get other values at https://docs.chain.link/docs/link-token-contracts
  //VRF Details set for Kovan environment, can get other values at https://docs.chain.link/docs/vrf-contracts#config

  console.log("----------------------------------------------------")
  console.log('Deploying RandomNumberConsumer')
  const randomNumberConsumer = await deploy('RandomNumberConsumer', {
    from: deployer,
    gasLimit: 4000000,
    args: [VrfCoordinator, LINK, KeyHash, Fee],
  })

  console.log("RandomNumberConsumer deployed to: ", randomNumberConsumer.address)
  console.log("Run the following command to fund contract with LINK:")
  console.log("npx hardhat fund-link --contract ", randomNumberConsumer.address)
  console.log("Then run RandomNumberConsumer contract with the following command, replacing '777' with your chosen seed number:")
  console.log("npx hardhat request-random-number --contract ", randomNumberConsumer.address, " --seed '777'")
  console.log("----------------------------------------------------")
}
