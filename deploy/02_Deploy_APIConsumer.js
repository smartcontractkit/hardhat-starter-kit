let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments
}) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  const chainId = await getChainId()
  let linkTokenAddress
  let oracle
  let additionalMessage = ""
  //set log level to ignore non errors
  ethers.utils.Logger.setLogLevel(ethers.utils.Logger.levels.ERROR)

  if (chainId == 31337) {
    let linkToken = await get('LinkToken')
    let MockOracle = await get('MockOracle')
    linkTokenAddress = linkToken.address
    oracle = MockOracle.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    oracle = networkConfig[chainId]['oracle']
  }
  const jobId = networkConfig[chainId]['jobId']
  const fee = networkConfig[chainId]['fee']
  const networkName = networkConfig[chainId]['name']

  const apiConsumer = await deploy('APIConsumer', {
    from: deployer,
    args: [oracle, jobId, fee, linkTokenAddress],
    log: true
  })

  log("Run API Consumer contract with following command:")
  log("npx hardhat request-data --contract " + apiConsumer.address + " --network " + networkName)
  log("----------------------------------------------------")
}
module.exports.tags = ['all', 'api', 'main']
