"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampedRequestSigner = void 0;
const jsrsasign_1 = require("jsrsasign");
const crypto_js_1 = require("crypto-js");
class TimestampedRequestSigner {
    constructor(privateKey = '', publicKey = '') {
        this.signRequestWithTimestamp = (requestObj) => {
            const timestampedRequest = Object.assign(Object.assign({}, requestObj), { timestamp: Date.now() });
            const requestHash = (0, crypto_js_1.SHA256)(JSON.stringify(timestampedRequest)).toString();
            const signature = this.generateSignature(requestHash);
            return Object.assign(Object.assign({}, timestampedRequest), { requestHash,
                signature });
        };
        this.generateSignature = (stringToSign) => {
            const sig = new jsrsasign_1.KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
            sig.init(this.privateKey);
            sig.updateString(stringToSign);
            const signature = sig.sign();
            return signature;
        };
        this.verifySignature = (signedString, signature) => {
            const sig = new jsrsasign_1.KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
            sig.init(this.publicKey);
            sig.updateString(signedString);
            return sig.verify(signature);
        };
        if (privateKey) {
            this.privateKey = jsrsasign_1.KEYUTIL.getKey('-----BEGIN RSA PRIVATE KEY-----\n' +
                privateKey +
                '\n-----END RSA PRIVATE KEY-----\n');
        }
        if (publicKey !== '') {
            this.publicKey = getRsaFromPubKey(publicKey);
        }
    }
}
exports.TimestampedRequestSigner = TimestampedRequestSigner;
const getRsaFromPubKey = (pubKeyB64) => {
    const pubKeyDecoded = (0, jsrsasign_1.b64tohex)(pubKeyB64);
    // jsrsasign cannot build key out of PEM or ASN.1 string, so we have to extract modulus and exponent
    // you can get some idea what happens from the link below (keep in mind that in JS every char is 2 bytes)
    // https://crypto.stackexchange.com/questions/18031/how-to-find-modulus-from-a-rsa-public-key/18034#18034
    const modulus = pubKeyDecoded.slice(16, pubKeyDecoded.length - 10);
    const exp = pubKeyDecoded.slice(pubKeyDecoded.length - 5);
    return jsrsasign_1.KEYUTIL.getKey({ n: modulus, e: exp });
};
