import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments, network } from "hardhat"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

import { VRFV2Wrapper, VRFV2Wrapper__factory } from "../typechain"
import { networkConfig } from "../helper-hardhat-config"

const deployFunction: DeployFunction = async (hre) => {
    const pointOneLink = "100000000000000000" // 0.1
    const pointZeroZeroThreeLink = "3000000000000000" // 0.003
    const oneHundredLink = "100000000000000000000" // 100 LINK

    const DECIMALS: string = `18`
    const INITIAL_PRICE: string = `200000000000000000000`

    /**
     * @dev Read more at https://docs.chain.link/docs/chainlink-vrf/
     */
    const BASE_FEE = "100000000000000000"
    const GAS_PRICE_LINK = "1000000000" // 0.000000001 LINK per gas

    // Configuration

    // This value is the worst-case gas overhead from the wrapper contract under the following
    // conditions, plus some wiggle room:
    //   - 10 words requested
    //   - Refund issued to consumer
    const wrapperGasOverhead = "60000"
    const coordinatorGasOverhead = "52000"
    const wrapperPremiumPercentage = 10
    const maxNumWords = 10
    const weiPerUnitLink = pointZeroZeroThreeLink

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number | undefined = network.config.chainId

    // If we are on a local development network, we need to deploy mocks!
    if (chainId === 31337) {
        log(`Local network detected! Deploying mocks...`)

        const linkToken = await deploy(`LinkToken`, { from: deployer, log: true })

        const linkEthFeed = await deploy(`MockV3Aggregator`, {
            contract: `MockV3Aggregator`,
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })

        const coordinator = await deploy("VRFCoordinatorV2Mock", {
            from: deployer,
            log: true,
            args: [BASE_FEE, GAS_PRICE_LINK],
        })

        // setup wrapper
        const wrapper = await deploy("VRFV2Wrapper", {
            from: deployer,
            log: true,
            args: [linkToken.address, linkEthFeed.address, coordinator.address],
        })

        const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
        const signer: SignerWithAddress = accounts[0]

        const wrapperContract: VRFV2Wrapper = VRFV2Wrapper__factory.connect(wrapper.address, signer)
        const keyHash = networkConfig[chainId]["keyHash"]!
        wrapperContract.setConfig(
            wrapperGasOverhead,
            coordinatorGasOverhead,
            wrapperPremiumPercentage,
            keyHash,
            maxNumWords
        )

        // MockOracle
        await deploy(`MockOracle`, {
            from: deployer,
            log: true,
            args: [linkToken.address],
        })

        log(`Mocks Deployed!`)
        log(`----------------------------------------------------`)
        log(`You are deploying to a local network, you'll need a local network running to interact`)
        log("Please run `yarn hardhat console` to interact with the deployed smart contracts!")
        log(`----------------------------------------------------`)
    }
}

export default deployFunction
deployFunction.tags = [`all`, `mocks`, `main`]
