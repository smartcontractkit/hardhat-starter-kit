const EthCrypto = require("eth-crypto")

const encrypt = async (signerPrivateKey, readerPublicKey, message) => {
    const signature = EthCrypto.sign(signerPrivateKey, EthCrypto.hash.keccak256(message))
    const payload = {
        message,
        signature,
    }

    const encrypted = await EthCrypto.encryptWithPublicKey(
        readerPublicKey, // by encrypting with reader's publicKey, only the reader can decrypt the payload with his privateKey
        JSON.stringify(payload) // we have to stringify the payload before we can encrypt it
    )

    // we convert the object into a smaller string-representation
    return EthCrypto.cipher.stringify(encrypted)
}

module.exports = {
    encrypt,
}
