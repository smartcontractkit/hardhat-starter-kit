const { developmentChains, VERIFICATION_BLOCK_CONFIRMATIONS } = require("../../helper-hardhat-config")
const { getNetworkConfig } = require("../utils")

const Action = {
  Add: 0,
  Remove: 1
}

async function addOrRemove(action, taskArgs) {
  const networkConfig = getNetworkConfig(network.name)

  const oracleFactory = await ethers.getContractFactory("OCR2DROracle")
  const oracle = oracleFactory.attach(networkConfig["ocr2odOracle"])

  const addresses = taskArgs.addresses.split(",")
  console.log(addresses)

  if (action == Action.Add) {
    console.log(`Adding addresses ${addresses} to oracle ${networkConfig["ocr2odOracle"]}`)
    tx = await oracle.addAuthorizedSenders(addresses)
  } else {
    console.log(`Removing addresses ${addresses} from oracle ${networkConfig["ocr2odOracle"]}`)
    tx = await oracle.removeAuthorizedSenders(addresses)
  }

  const waitBlockConfirmations = developmentChains.includes(network.name)
      ? 1
      : VERIFICATION_BLOCK_CONFIRMATIONS
  console.log(`Waiting ${waitBlockConfirmations} blocks for transaction ${tx.hash} to be confirmed...`)
  await tx.wait(waitBlockConfirmations)

  console.log(`Allowlist updated for oracle ${oracle.address} on ${networkConfig.name}`)
}

task("on-demand-add-senders", "Add wallets to allowlist in the Oracle contract")
    .addParam(
      "addresses",
      "Comma-separated list of addresses")
    .setAction(async (taskArgs) => {
      await addOrRemove(Action.Add, taskArgs)
    })

task("on-demand-remove-senders", "Remove wallets from allowlist in the Oracle contract")
    .addParam(
      "addresses",
      "Comma-separated list of addresses")
    .setAction(async (taskArgs) => {
      await addOrRemove(Action.Remove, taskArgs)
    })
module.exports = {}