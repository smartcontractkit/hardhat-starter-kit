let { networkConfig} = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments,
  getChainId
}) => {

  const { deploy, get, log } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let vrfCoordinatorAddress
  let additionalMessage = ""

  if (chainId == 31337) {
    linkToken = await get('LinkToken')
    VRFCoordinatorMock = await get('VRFCoordinatorMock')
    linkTokenAddress = linkToken.address
    vrfCoordinatorAddress = VRFCoordinatorMock.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    vrfCoordinatorAddress = networkConfig[chainId]['vrfCoordinator']
  }
  const keyHash = networkConfig[chainId]['keyHash']
  const fee = networkConfig[chainId]['fee']
  const networkName = networkConfig[chainId]['name']

  const randomNumberConsumer = await deploy('RandomNumberConsumer', {
    from: deployer,
    args: [vrfCoordinatorAddress, linkTokenAddress, keyHash, fee],
    log: true
  })

  log("Run RandomNumberConsumer contract with the following command, replacing '777' with your chosen seed number:")
  log("npx hardhat request-random-number --contract " + randomNumberConsumer.address, " --seed '777'" + " --network " + networkName)
  log("----------------------------------------------------")
}

module.exports.tags = ['all', 'vrf', 'main']
