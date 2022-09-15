const networkConfig = {
  default: {
    name: "hardhat",
    fee: "100000000000000000",
    keyHash: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
    keepersUpdateInterval: "30",
  },
  31337: {
    name: "localhost",
    fee: "100000000000000000",
    keyHash: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc",
    jobId: "29fa9aa13bf1468788b7cc4a500a45b8",
    fundAmount: "1000000000000000000",
    keepersUpdateInterval: "30",
    ethUsdPriceFeed: "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419",
  },
  1: {
    name: "mainnet",
    linkToken: "0x514910771af9ca656af840dff83e8264ecf986ca",
    fundAmount: "0",
    keepersUpdateInterval: "30",
  },
  5: {
    name: "goerli",
    linkToken: "0x326c977e6efc84e512bb9c30f76e30c160ed06fb",
    ethUsdPriceFeed: "0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e",
    keyHash: "0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15",
    vrfCoordinator: "0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D",
    oracle: "0xCC79157eb46F5624204f47AB42b3906cAA40eaB7",
    jobId: "ca98366cc7314957b8c012c72f05aeeb",
    fee: "100000000000000000",
    fundAmount: "100000000000000000", // 0.1
    keepersUpdateInterval: "30",
  },
  137: {
    name: "polygon",
    linkToken: "0xb0897686c545045afc77cf20ec7a532e3120e0f1",
    ethUsdPriceFeed: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
    oracle: "0x0a31078cd57d23bf9e8e8f1ba78356ca2090569e",
    jobId: "12b86114fa9e46bab3ca436f88e1a912",
    fee: "100000000000000",
    fundAmount: "100000000000000",
  },
}

const developmentChains = ["hardhat", "localhost"]
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

module.exports = {
  networkConfig,
  developmentChains,
  VERIFICATION_BLOCK_CONFIRMATIONS,
}
