let { networkConfig } = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments
}) => {
  const { deploy, log, get } = deployments
  const { deployer } = await getNamedAccounts()
  let chainId = await getChainId()
  let linkTokenAddress
  let oracle
  let additionalMessage = ""

  if (chainId == 31337) {
    linkToken = await get('LinkToken')
    MockOracle = await get('MockOracle')
    linkTokenAddress = linkToken.address
    oracle = MockOracle.address
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    oracle = networkConfig[chainId]['oracle']
  }
  let jobId = networkConfig[chainId]['jobId']
  let fee = networkConfig[chainId]['fee']

  log("----------------------------------------------------")
  log('Deploying APIConsumer')
  const apiConsumer = await deploy('APIConsumer', {
    from: deployer,
    args: [oracle, jobId, fee, linkTokenAddress],
    log: true
  })

  log("APIConsumer deployed to: ", apiConsumer.address)
  log("Run the following command to fund contract with LINK:")
  log("npx hardhat fund-link --contract " + apiConsumer.address + " --network " + networkConfig[chainId]['name'] + additionalMessage)
  log("Then run API Consumer contract with following command:")
  log("npx hardhat request-data --contract " + apiConsumer.address + " --network " + networkConfig[chainId]['name'])
}
// This line means we need to wait for mocks to run first
module.exports.dependencies = ['Mocks']
