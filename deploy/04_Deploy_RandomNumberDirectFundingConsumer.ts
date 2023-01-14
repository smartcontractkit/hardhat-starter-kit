import { DeployFunction } from "hardhat-deploy/types"
import { ethers, network } from "hardhat"
import {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config"
import { verify } from "../helper-functions"
import { BigNumber, ContractReceipt, ContractTransaction } from "ethers"
import { VRFCoordinatorV2Mock } from "../typechain"

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy, get, log } = deployments

    const { deployer } = await getNamedAccounts()
    const chainId: number | undefined = network.config.chainId
    if (!chainId) return

    let linkTokenAddress: string | undefined
    let wrapperAddress: string | undefined
    let subscriptionId: BigNumber

    if (chainId === 31337) {
        const linkToken = await get("LinkToken")
        const VRFCoordinatorV2Mock: VRFCoordinatorV2Mock = await ethers.getContract(
            "VRFCoordinatorV2Mock"
        )
        const wrapperFactory = await ethers.getContract("VRFV2Wrapper")

        wrapperAddress = wrapperFactory.address
        linkTokenAddress = linkToken.address
    } else {
        linkTokenAddress = networkConfig[chainId].linkToken
        wrapperAddress = networkConfig[chainId].vrfWrapper
    }

    const waitBlockConfirmations: number = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS

    const args = [linkTokenAddress, wrapperAddress]
    const randomNumberConsumerV2 = await deploy("RandomNumberDirectFundingConsumerV2", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(randomNumberConsumerV2.address, args)
    }

    log("Run RandomNumberConsumer contract with the following command")
    // const networkName = network.name == "hardhat" ? "localhost" : network.name
    // log(
    //     `yarn hardhat request-random-number-direct-funding --contract ${randomNumberConsumerV2.address} --numwords 1 --network ${networkName}`
    // )

    if (chainId == 31337) {
        console.log(
            `Run the following command to fund your contract with link tokens: yarn hardhat transfer-link --recipient ${randomNumberConsumerV2.address} --linkaddress ${linkTokenAddress} --amount REPLACE_AMOUNT_IN_JUELS --network ${network.name}`
        )
    } else {
        console.log(
            `Run the following command to fund your contract with link tokens: yarn hardhat transfer-link --recipient ${randomNumberConsumerV2.address} --amount REPLACE_AMOUNT_IN_JUELS --network ${network.name}`
        )
    }
    log("----------------------------------------------------")
}

export default deployFunction
deployFunction.tags = [`all`, `vrf`]
