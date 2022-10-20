const EthCrypto = require("eth-crypto")

const decrypt = async (privateKey, encryptedString) => {
    // we parse the string into the object again
    const encryptedObject = EthCrypto.cipher.parse(encryptedString)

    const decrypted = await EthCrypto.decryptWithPrivateKey(privateKey, encryptedObject)
    const decryptedPayload = JSON.parse(decrypted)

    // check signature
    const senderAddress = EthCrypto.recover(
        decryptedPayload.signature,
        EthCrypto.hash.keccak256(decryptedPayload.message)
    )

    console.log("Got message from " + senderAddress + ": " + decryptedPayload.message)
    return { message: decryptedPayload.message, sender: senderAddress }
}

module.exports = {
    decrypt,
}
