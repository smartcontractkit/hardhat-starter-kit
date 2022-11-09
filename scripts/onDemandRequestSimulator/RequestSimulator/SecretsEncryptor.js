"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.encrypt = void 0;
const eth_crypto_1 = __importDefault(require("eth-crypto"));
const encrypt = (signerPrivateKey, readerPublicKey, message) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = eth_crypto_1.default.sign(signerPrivateKey, eth_crypto_1.default.hash.keccak256(message));
    const payload = {
        message,
        signature,
    };
    const encrypted = yield eth_crypto_1.default.encryptWithPublicKey(readerPublicKey, JSON.stringify(payload));
    return eth_crypto_1.default.cipher.stringify(encrypted);
});
exports.encrypt = encrypt;
