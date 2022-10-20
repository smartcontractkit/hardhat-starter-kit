const EthCrypto = require("eth-crypto")

const generateKeys = () => {
    const { publicKey, privateKey } = EthCrypto.createIdentity()
    const address = EthCrypto.publicKey.toAddress(publicKey)
    return { publicKey, address, privateKey }
}
const { publicKey, address, privateKey } = generateKeys()
console.log({ publicKey, address, privateKey })

module.exports = {
    generateKeys,
}
