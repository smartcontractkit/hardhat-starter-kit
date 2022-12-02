const EthCrypto = require("eth-crypto")

const generateKeys = () => {
    const { publicKey, privateKey } = EthCrypto.createIdentity()
    const address = EthCrypto.publicKey.toAddress(publicKey)
    return { publicKey, address, privateKey }
}

module.exports = {
    generateKeys,
}
