/* eslint-disable no-process-exit */
// yarn hardhat node
// yarn hardhat run scripts/readPrice.ts --network localhost
import { ethers } from "hardhat"
import { BigNumber } from "ethers"
import { PriceConsumerV3 } from "../typechain"

async function readPrice(): Promise<void> {
    const priceConsumerV3: PriceConsumerV3 = await ethers.getContract("PriceConsumerV3")
    const price: BigNumber = await priceConsumerV3.getLatestPrice()
    console.log(price.toString())
}

readPrice()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
