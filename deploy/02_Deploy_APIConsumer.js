let { networkConfig, deployMock } = require('../helper-hardhat-config')

module.exports = async ({
  getNamedAccounts,
  deployments
}) => {
  const { deploy } = deployments
  const { deployer } = await getNamedAccounts()
  let chainId = await getChainId()
  let linkTokenAddress
  let oracle
  let additionalMessage = ""

  if (chainId == 31337) {
    linkTokenAddress = await deployMock('LinkToken')
    oracle = await deployMock('MockOracle', [linkTokenAddress])
    additionalMessage = " --linkaddress " + linkTokenAddress
  } else {
    linkTokenAddress = networkConfig[chainId]['linkToken']
    oracle = networkConfig[chainId]['oracle']
  }
  let jobId = networkConfig[chainId]['jobId']
  let fee = networkConfig[chainId]['fee']

  console.log("----------------------------------------------------")
  console.log('Deploying APIConsumer')
  const apiConsumer = await deploy('APIConsumer', {
    from: deployer,
    args: [oracle, jobId, fee, linkTokenAddress],
    log: true
  })

  console.log("APIConsumer deployed to: ", apiConsumer.address)
  console.log("Run the following command to fund contract with LINK:")
  console.log("npx hardhat fund-link --contract " + apiConsumer.address + " --network " + networkConfig[chainId]['name'] + additionalMessage)
  console.log("Then run API Consumer contract with following command:")
  console.log("npx hardhat request-data --contract " + apiConsumer.address + " --network " + networkConfig[chainId]['name'])
}
