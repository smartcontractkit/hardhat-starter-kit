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
exports.buildOCR2DRmodule = void 0;
const axios_1 = __importDefault(require("axios"));
const buildOCR2DRmodule = (numAllowedQueries) => {
    return {
        makeHttpRequest: makeHttpRequestFactory(numAllowedQueries),
        encodeUint256,
        encodeInt256,
        encodeString,
    };
};
exports.buildOCR2DRmodule = buildOCR2DRmodule;
const makeHttpRequestFactory = (maxHttpRequests) => {
    let totalHttpRequests = 0;
    return ({ url, method = 'get', params, headers, data, timeout = 10000, responseType = 'json', }) => __awaiter(void 0, void 0, void 0, function* () {
        if (totalHttpRequests < maxHttpRequests) {
            totalHttpRequests++;
            let result;
            try {
                result = (yield (0, axios_1.default)({
                    method: method.toLowerCase(),
                    url,
                    params,
                    headers,
                    data,
                    timeout,
                    responseType,
                }));
                // Delete the request to avoid exposing system information to the user's code
                delete result.request;
                delete result.config;
                result.error = false;
                return result;
            }
            catch (untypedError) {
                const error = untypedError;
                delete error.request;
                delete error.config;
                error.error = true;
                return error;
            }
        }
        throw Error('exceeded numAllowedQueries');
    });
};
const encodeUint256 = (result) => {
    if (typeof result === 'number') {
        if (!Number.isInteger(result)) {
            throw Error('OCR2DR.encodeUint256 only accepts an integer number');
        }
        if (result < 0) {
            throw Error('OCR2DR.encodeUint256 only accepts a positive number');
        }
        return encodeUint256(BigInt(result));
    }
    if (typeof result === 'bigint') {
        if (result > maxUint256) {
            throw Error('OCR2DR.encodeUint256 only accepts a bigint less than 2^256');
        }
        if (result < BigInt(0)) {
            throw Error('OCR2DR.encodeUint256 only accepts a positive bigint');
        }
        if (result === BigInt(0)) {
            return Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');
        }
        const hex = result.toString(16).padStart(64, '0');
        return Buffer.from(hex, 'hex');
    }
    throw Error('OCR2DR.encodeUint256 only accepts a number or bigint');
};
const encodeInt256 = (result) => {
    if (typeof result === 'number') {
        if (!Number.isInteger(result)) {
            throw Error('OCR2DR.encodeInt256 only accepts an integer number');
        }
        return encodeInt256(BigInt(result));
    }
    if (typeof result !== 'bigint') {
        throw Error('OCR2DR.encodeInt256 only accepts a number or bigint');
    }
    if (result < maxNegInt256) {
        throw Error('OCR2DR.encodeInt256 only accepts a bigint greater than or equal to -(2^255)');
    }
    if (result > maxPosInt256) {
        throw Error('OCR2DR.encodeInt256 only accepts a bigint less than 2^255');
    }
    if (result < BigInt(0)) {
        return encodeNegSignedInt(result);
    }
    return encodePosSignedInt(result);
};
const encodeString = (result) => {
    if (typeof result !== 'string') {
        throw Error('OCR2DR.encodeString only accepts a string');
    }
    return Buffer.from(result);
};
const encodePosSignedInt = (int) => {
    const hex = int.toString(16).padStart(64, '0');
    return Buffer.from(hex, 'hex');
};
const encodeNegSignedInt = (int) => {
    const overflowingHex = (BigInt(2) ** BigInt(256) + int).toString(16);
    const int256Hex = overflowingHex.slice(-64);
    return Buffer.from(int256Hex, 'hex');
};
const maxUint256 = BigInt('115792089237316195423570985008687907853269984665640564039457584007913129639935');
const maxPosInt256 = BigInt('57896044618658097711785492504343953926634992332820282019728792003956564819967');
const maxNegInt256 = BigInt('-57896044618658097711785492504343953926634992332820282019728792003956564819968');
