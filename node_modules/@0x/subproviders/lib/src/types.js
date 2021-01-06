"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WalletSubproviderErrors;
(function (WalletSubproviderErrors) {
    WalletSubproviderErrors["AddressNotFound"] = "ADDRESS_NOT_FOUND";
    WalletSubproviderErrors["DataMissingForSignPersonalMessage"] = "DATA_MISSING_FOR_SIGN_PERSONAL_MESSAGE";
    WalletSubproviderErrors["DataMissingForSignTypedData"] = "DATA_MISSING_FOR_SIGN_TYPED_DATA";
    WalletSubproviderErrors["SenderInvalidOrNotSupplied"] = "SENDER_INVALID_OR_NOT_SUPPLIED";
    WalletSubproviderErrors["FromAddressMissingOrInvalid"] = "FROM_ADDRESS_MISSING_OR_INVALID";
    WalletSubproviderErrors["MethodNotSupported"] = "METHOD_NOT_SUPPORTED";
})(WalletSubproviderErrors = exports.WalletSubproviderErrors || (exports.WalletSubproviderErrors = {}));
var LedgerSubproviderErrors;
(function (LedgerSubproviderErrors) {
    LedgerSubproviderErrors["TooOldLedgerFirmware"] = "TOO_OLD_LEDGER_FIRMWARE";
    LedgerSubproviderErrors["MultipleOpenConnectionsDisallowed"] = "MULTIPLE_OPEN_CONNECTIONS_DISALLOWED";
})(LedgerSubproviderErrors = exports.LedgerSubproviderErrors || (exports.LedgerSubproviderErrors = {}));
var NonceSubproviderErrors;
(function (NonceSubproviderErrors) {
    NonceSubproviderErrors["EmptyParametersFound"] = "EMPTY_PARAMETERS_FOUND";
    NonceSubproviderErrors["CannotDetermineAddressFromPayload"] = "CANNOT_DETERMINE_ADDRESS_FROM_PAYLOAD";
})(NonceSubproviderErrors = exports.NonceSubproviderErrors || (exports.NonceSubproviderErrors = {}));
//# sourceMappingURL=types.js.map