const helperConfig = require("../helper-hardhat-config")

exports.getNetworkConfig = (networkName) => {
  const networkConfigs = helperConfig.networkConfig 
  for (const network in networkConfigs) {
    if (networkConfigs[network].name === networkName) {
      return { chainId: network, ...networkConfigs[network] }
    }
  }
  throw Error(`Network ${networkName} not found in helper-hardhat-config.js`)
}