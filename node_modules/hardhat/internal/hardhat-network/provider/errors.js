"use strict";
// Taken from: https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1474.md#error-codes
//
// Code	  Message	              Meaning	                            Category
//
// -32700	Parse error	          Invalid JSON	                      standard
// -32600	Invalid request	      JSON is not a valid request object  standard
// -32601	Method not found	    Method does not exist	              standard
// -32602	Invalid params	      Invalid method parameters	          standard
// -32603	Internal error	      Internal JSON-RPC error	            standard
// -32004	Method not supported	Method is not implemented	          non-standard
//
// Not implemented:
// -32000	Invalid input	        Missing or invalid parameters	      non-standard
// -32001	Resource not found	  Requested resource not found	      non-standard
// -32002	Resource unavailable	Requested resource not available	  non-standard
// -32003	Transaction rejected	Transaction creation failed	        non-standard
Object.defineProperty(exports, "__esModule", { value: true });
exports.MethodNotSupportedError = exports.TransactionExecutionError = exports.InvalidInputError = exports.InternalError = exports.InvalidArgumentsError = exports.MethodNotFoundError = exports.InvalidRequestError = exports.InvalidJsonInputError = exports.HardhatNetworkProviderError = void 0;
const errors_1 = require("../../core/errors");
class HardhatNetworkProviderError extends errors_1.CustomError {
    constructor(message, code) {
        super(message);
        this.code = code;
        this._isHardhatNetworkProviderError = true;
    }
    static isHardhatNetworkProviderError(other) {
        return (other !== undefined &&
            other !== null &&
            other._isHardhatNetworkProviderError === true);
    }
}
exports.HardhatNetworkProviderError = HardhatNetworkProviderError;
class InvalidJsonInputError extends HardhatNetworkProviderError {
    constructor(message) {
        super(message, InvalidJsonInputError.CODE);
    }
}
exports.InvalidJsonInputError = InvalidJsonInputError;
InvalidJsonInputError.CODE = -32700;
class InvalidRequestError extends HardhatNetworkProviderError {
    constructor(message) {
        super(message, InvalidRequestError.CODE);
    }
}
exports.InvalidRequestError = InvalidRequestError;
InvalidRequestError.CODE = -32600;
class MethodNotFoundError extends HardhatNetworkProviderError {
    constructor(message) {
        super(message, MethodNotFoundError.CODE);
    }
}
exports.MethodNotFoundError = MethodNotFoundError;
MethodNotFoundError.CODE = -32601;
class InvalidArgumentsError extends HardhatNetworkProviderError {
    constructor(message) {
        super(message, InvalidArgumentsError.CODE);
    }
}
exports.InvalidArgumentsError = InvalidArgumentsError;
InvalidArgumentsError.CODE = -32602;
class InternalError extends HardhatNetworkProviderError {
    constructor(message) {
        super(message, InternalError.CODE);
    }
}
exports.InternalError = InternalError;
InternalError.CODE = -32603;
class InvalidInputError extends HardhatNetworkProviderError {
    constructor(message) {
        super(message, InvalidInputError.CODE);
    }
}
exports.InvalidInputError = InvalidInputError;
InvalidInputError.CODE = -32000;
class TransactionExecutionError extends HardhatNetworkProviderError {
    constructor(parent) {
        if (typeof parent === "string") {
            parent = new Error(parent);
        }
        super(parent.message, TransactionExecutionError.CODE);
        this.parent = parent;
        this.stack = parent.stack;
    }
}
exports.TransactionExecutionError = TransactionExecutionError;
TransactionExecutionError.CODE = -32003;
class MethodNotSupportedError extends HardhatNetworkProviderError {
    constructor(method) {
        super(`Method ${method} is not supported`, MethodNotSupportedError.CODE);
    }
}
exports.MethodNotSupportedError = MethodNotSupportedError;
MethodNotSupportedError.CODE = -32004;
//# sourceMappingURL=errors.js.map