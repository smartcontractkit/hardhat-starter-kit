"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const eth_crypto_1 = __importDefault(require("eth-crypto"));
const encrypt = async (signerPrivateKey, readerPublicKey, message) => {
    const signature = eth_crypto_1.default.sign(signerPrivateKey, eth_crypto_1.default.hash.keccak256(message));
    const payload = {
        message,
        signature,
    };
    const encrypted = await eth_crypto_1.default.encryptWithPublicKey(readerPublicKey, JSON.stringify(payload));
    return eth_crypto_1.default.cipher.stringify(encrypted);
};
exports.encrypt = encrypt;
