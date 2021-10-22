const networkConfig = {
    default: {
        name: 'hardhat',
        fee: '100000000000000000',
        keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
        jobId: '29fa9aa13bf1468788b7cc4a500a45b8',
        fundAmount: "1000000000000000000",
        keepersUpdateInterval: "30"
    },
    31337: {
        name: 'localhost',
        fee: '100000000000000000',
        keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
        jobId: '29fa9aa13bf1468788b7cc4a500a45b8',
        fundAmount: "1000000000000000000",
        keepersUpdateInterval: "30"
    },
    42: {
        name: 'kovan',
        linkToken: '0xa36085F69e2889c224210F603D836748e7dC0088',
        ethUsdPriceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331',
        keyHash: '0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4',
        vrfCoordinator: '0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9',
        oracle: '0xc57b33452b4f7bb189bb5afae9cc4aba1f7a4fd8',
        jobId: 'd5270d1c311941d0b08bead21fea7747',
        fee: '100000000000000000',
        fundAmount: "1000000000000000000",
        keepersUpdateInterval: "30"
    },
    4: {
        name: 'rinkeby',
        linkToken: '0x01be23585060835e02b77ef475b0cc51aa1e0709',
        ethUsdPriceFeed: '0x8A753747A1Fa494EC906cE90E9f37563A8AF630e',
        keyHash: '0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311',
        vrfCoordinator: '0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B',
        oracle: '0xc57b33452b4f7bb189bb5afae9cc4aba1f7a4fd8',
        jobId: '6b88e0402e5d415eb946e528b8e0c7ba',
        fee: '100000000000000000',
        fundAmount: "1000000000000000000",
        keepersUpdateInterval: "30"
    },
    1: {
        name: 'mainnet',
        linkToken: '0x514910771af9ca656af840dff83e8264ecf986ca',
        fundAmount: "0",
        keepersUpdateInterval: "30"
    },
    5: {
        name: 'goerli',
        linkToken: '0x326c977e6efc84e512bb9c30f76e30c160ed06fb',
        fundAmount: "0"
    },
    80001: {
        name: 'mumbai',
        linkToken: '0x326C977E6efc84E512bB9C30f76E30c160eD06FB',
        ethUsdPriceFeed: '0x0715A7794a1dc8e42615F059dD6e406A6594651A',
        keyHash: '0x6e75b569a01ef56d18cab6a8e71e6600d6ce853834d4a5748b720d06f878b3a4',
        vrfCoordinator: '0x8C7382F9D8f56b33781fE506E897a4F1e2d17255',
        oracle: '0x58bbdbfb6fca3129b91f0dbe372098123b38b5e9',
        jobId: 'da20aae0e4c843f6949e5cb3f7cfe8c4',
        fee: '100000000000000',
        fundAmount: "100000000000000"
    },
    137: {
        name: 'polygon',
        linkToken: '0xb0897686c545045afc77cf20ec7a532e3120e0f1',
        ethUsdPriceFeed: '0xF9680D99D6C9589e2a93a78A04A279e509205945',
        keyHash: '0xf86195cf7690c55907b2b611ebb7343a6f649bff128701cc542f0569e2c549da',
        vrfCoordinator: '0x3d2341ADb2D31f1c5530cDC622016af293177AE0',
        oracle: '0x0a31078cd57d23bf9e8e8f1ba78356ca2090569e',
        jobId: '12b86114fa9e46bab3ca436f88e1a912',
        fee: '100000000000000',
        fundAmount: "100000000000000"
    },
}

const developmentChains = ["hardhat", "localhost"]

const getNetworkIdFromName = async (networkIdName) => {
    for (const id in networkConfig) {
        if (networkConfig[id]['name'] == networkIdName) {
            return id
        }
    }
    return null
}

const autoFundCheck = async (contractAddr, networkName, linkTokenAddress, additionalMessage) => {
    const chainId = await getChainId()
    console.log("Checking to see if contract can be auto-funded with LINK:")
    const amount = networkConfig[chainId]['fundAmount']
    //check to see if user has enough LINK
    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const LinkToken = await ethers.getContractFactory("LinkToken")
    const linkTokenContract = new ethers.Contract(linkTokenAddress, LinkToken.interface, signer)
    const balanceHex = await linkTokenContract.balanceOf(signer.address)
    const balance = await ethers.BigNumber.from(balanceHex._hex).toString()
    const contractBalanceHex = await linkTokenContract.balanceOf(contractAddr)
    const contractBalance = await ethers.BigNumber.from(contractBalanceHex._hex).toString()
    if (balance > amount && amount > 0 && contractBalance < amount) {
        //user has enough LINK to auto-fund
        //and the contract isn't already funded
        return true
    } else { //user doesn't have enough LINK, print a warning
        console.log("Account doesn't have enough LINK to fund contracts, or you're deploying to a network where auto funding isnt' done by default")
        console.log("Please obtain LINK via the faucet at https://" + networkName + ".chain.link/, then run the following command to fund contract with LINK:")
        console.log("npx hardhat fund-link --contract " + contractAddr + " --network " + networkName + additionalMessage)
        return false
    }
}

module.exports = {
    networkConfig,
    getNetworkIdFromName,
    autoFundCheck,
    developmentChains
}
