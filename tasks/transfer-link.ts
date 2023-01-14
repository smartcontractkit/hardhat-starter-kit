import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { BigNumber, utils} from "ethers"
import { task } from "hardhat/config"
import { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types"
import { networkConfig, getNetworkIdFromName } from "../helper-hardhat-config"
import { LinkToken, LinkToken__factory } from "../typechain"

task("transfer-link", "Transfer LINK tokens to a recipient")
  .addParam(
    "recipient",
    "The address of the EOA or contract account that will receive your LINK tokens"
  )
  .addParam("amount", "Amount in Juels. 1LINK=10**18 JUELS")
  .addOptionalParam("linkaddress", "Set the LINK token address")
  .setAction(async (taskArgs: TaskArguments, hre: HardhatRuntimeEnvironment): Promise<void> => {
    const { recipient: recipientAddress, amount } = taskArgs
    const networkId: string | null = await getNetworkIdFromName(hre.network.name)

    if (!networkId) return

    //Get signer information
    const accounts: SignerWithAddress[] = await hre.ethers.getSigners()
    const signer: SignerWithAddress = accounts[0]

    //First, lets see if there is any LINK to withdraw
    const linkTokenAddress = networkConfig[networkId].linkToken || taskArgs.linkaddress

    const linkTokenContract: LinkToken = LinkToken__factory.connect(linkTokenAddress, signer)

    const balance: BigNumber = await linkTokenContract.balanceOf(signer.address)

    console.log(`LINK balance of sender ${signer.address} in contract: ${linkTokenAddress} is ${utils.formatEther(balance)}`)

    const amountBN = BigNumber.from(amount)
    
    if (balance.gte(amountBN)) {
      const result = await linkTokenContract.transfer(recipientAddress, amount)
      await result.wait()
      console.log(
          `${utils.formatEther(amountBN)} LINK where sent from sender ${
              signer.address
          } to ${recipientAddress}.Transaction Hash: ${result.hash}`
      )
    } else {
      console.log(
        `Sender doesn't have enough LINK. Current balance is ${utils.formatEther(
            balance
        )} LINK and transfer amount is ${utils.formatEther(amount)} LINK`
    )
    }
  })
