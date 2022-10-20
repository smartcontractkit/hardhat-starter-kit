const { ocr2drRequest } = require("../../ocr2dr-config")
const { encrypt } = require("../../scripts/encrypt")

task("on-demand-request", "Calls an On Demand API Consumer Contract to request external data")
    .addParam(
        "contract",
        "The address of the On Demand On Demand API Consumer contract that you want to call"
    )
    .setAction(async (taskArgs) => {
        const contractAddr = taskArgs.contract
        const networkId = network.name
        const chainId = network.config.chainId
        console.log(
            "Requesting new data from On Demand API Consumer contract ",
            contractAddr,
            " on network ",
            networkId
        )
        const APIConsumer = await ethers.getContractFactory("OnDemandAPIConsumer")

        //Get signer information
        const accounts = await ethers.getSigners()
        const signer = accounts[0]

        //Create connection to API Consumer Contract and call the createRequestTo function
        const apiConsumerContract = new ethers.Contract(contractAddr, APIConsumer.interface, signer)
        const { args = [], queries = [], secrets: rawSecrets = [], source } = ocr2drRequest[chainId]
        if (!source) throw Error("Source code must be given to make a new request")

        // Encrypt secrets
        const PRIVATE_KEY = process.env.PRIVATE_KEY
        if (!PRIVATE_KEY)
            throw Error(
                "Private key must be set for write commands using the PRIVATE_KEY environment variable"
            )

        const deployerWallet = new ethers.Wallet(PRIVATE_KEY)
        const publicKeyBytesString = await apiConsumerContract.getDONPublicKey()
        const publicKeyBytes = ethers.utils.arrayify(publicKeyBytesString)
        const publicKey = ethers.utils.toUtf8String(publicKeyBytes)
        const secretsJsonString = JSON.stringify(rawSecrets)
        const secretsEncryptedString = await encrypt(
            deployerWallet.privateKey,
            publicKey,
            secretsJsonString
        )

        const secrets = ethers.utils.toUtf8Bytes(secretsEncryptedString)

        console.log("Requesting with the following input:\n", {
            args,
            queries,
            secrets: rawSecrets,
            source,
        })
        const arguments = [source, args, queries, secrets]
        const transaction = await apiConsumerContract.executeRequest(...arguments)
        const receipt = await transaction.wait()
        const requestId = receipt
        console.log("Request initiated with ID: ", requestId)
    })
module.exports = {}
