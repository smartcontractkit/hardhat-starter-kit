let { networkConfig, deployMock } = require('../helper-hardhat-config')


module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId
}) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  let chainId = await getChainId()
  let linkTokenAddress
  let vrfCoordinatorAddress
  let additionalMessage = ""

  if (chainId == 31337) {
    linkTokenAddress = await deployMock('LinkToken')
    vrfCoordinatorAddress = await deployMock('VRFCoordinatorMock', [linkTokenAddress])
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator']
  }
  let keyHash = networkConfig[chainId]['keyHash']
  let fee = networkConfig[chainId]['fee']

  console.log("----------------------------------------------------")
  console.log('Deploying RandomNumberConsumer')
  const randomNumberConsumer = await deploy('RandomNumberConsumer', {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee],
    log: true
  })

  console.log("RandomNumberConsumer deployed to: ", randomNumberConsumer.address)
  console.log("Run the following command to fund contract with LINK:")
  console.log("npx hardhat fund-link --contract " + randomNumberConsumer.address + " --network " + networkConfig[chainId]['name'] + additionalMessage)
  console.log("Then run RandomNumberConsumer contract with the following command, replacing '777' with your chosen seed number:")
  console.log("npx hardhat request-random-number --contract " + randomNumberConsumer.address, " --seed '777'" + " --network " + networkConfig[chainId]['name'])
  console.log("----------------------------------------------------")
}
