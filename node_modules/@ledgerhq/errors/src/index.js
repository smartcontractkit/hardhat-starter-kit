// @flow

import {
  serializeError,
  deserializeError,
  createCustomErrorClass,
  addCustomErrorDeserializer
} from "./helpers";

export {
  serializeError,
  deserializeError,
  createCustomErrorClass,
  addCustomErrorDeserializer
};

export const AccountNameRequiredError = createCustomErrorClass(
  "AccountNameRequired"
);
export const AccountNotSupported = createCustomErrorClass(
  "AccountNotSupported"
);
export const AmountRequired = createCustomErrorClass("AmountRequired");
export const BluetoothRequired = createCustomErrorClass("BluetoothRequired");
export const BtcUnmatchedApp = createCustomErrorClass("BtcUnmatchedApp");
export const CantOpenDevice = createCustomErrorClass("CantOpenDevice");
export const CashAddrNotSupported = createCustomErrorClass(
  "CashAddrNotSupported"
);
export const CurrencyNotSupported = createCustomErrorClass(
  "CurrencyNotSupported"
);
export const DeviceAppVerifyNotSupported = createCustomErrorClass(
  "DeviceAppVerifyNotSupported"
);
export const DeviceGenuineSocketEarlyClose = createCustomErrorClass(
  "DeviceGenuineSocketEarlyClose"
);
export const DeviceNotGenuineError = createCustomErrorClass("DeviceNotGenuine");
export const DeviceOnDashboardExpected = createCustomErrorClass(
  "DeviceOnDashboardExpected"
);
export const DeviceOnDashboardUnexpected = createCustomErrorClass(
  "DeviceOnDashboardUnexpected"
);
export const DeviceInOSUExpected = createCustomErrorClass(
  "DeviceInOSUExpected"
);
export const DeviceHalted = createCustomErrorClass("DeviceHalted");
export const DeviceNameInvalid = createCustomErrorClass("DeviceNameInvalid");
export const DeviceSocketFail = createCustomErrorClass("DeviceSocketFail");
export const DeviceSocketNoBulkStatus = createCustomErrorClass(
  "DeviceSocketNoBulkStatus"
);
export const DisconnectedDevice = createCustomErrorClass("DisconnectedDevice");
export const DisconnectedDeviceDuringOperation = createCustomErrorClass(
  "DisconnectedDeviceDuringOperation"
);
export const EnpointConfigError = createCustomErrorClass("EnpointConfig");
export const EthAppPleaseEnableContractData = createCustomErrorClass(
  "EthAppPleaseEnableContractData"
);
export const FeeEstimationFailed = createCustomErrorClass(
  "FeeEstimationFailed"
);
export const HardResetFail = createCustomErrorClass("HardResetFail");
export const InvalidXRPTag = createCustomErrorClass("InvalidXRPTag");
export const InvalidAddress = createCustomErrorClass("InvalidAddress");
export const InvalidAddressBecauseDestinationIsAlsoSource = createCustomErrorClass(
  "InvalidAddressBecauseDestinationIsAlsoSource"
);
export const LatestMCUInstalledError = createCustomErrorClass(
  "LatestMCUInstalledError"
);
export const UnknownMCU = createCustomErrorClass("UnknownMCU");
export const LedgerAPIError = createCustomErrorClass("LedgerAPIError");
export const LedgerAPIErrorWithMessage = createCustomErrorClass(
  "LedgerAPIErrorWithMessage"
);
export const LedgerAPINotAvailable = createCustomErrorClass(
  "LedgerAPINotAvailable"
);
export const ManagerAppAlreadyInstalledError = createCustomErrorClass(
  "ManagerAppAlreadyInstalled"
);
export const ManagerAppRelyOnBTCError = createCustomErrorClass(
  "ManagerAppRelyOnBTC"
);
export const ManagerAppDepInstallRequired = createCustomErrorClass(
  "ManagerAppDepInstallRequired"
);
export const ManagerAppDepUninstallRequired = createCustomErrorClass(
  "ManagerAppDepUninstallRequired"
);
export const ManagerDeviceLockedError = createCustomErrorClass(
  "ManagerDeviceLocked"
);
export const ManagerFirmwareNotEnoughSpaceError = createCustomErrorClass(
  "ManagerFirmwareNotEnoughSpace"
);
export const ManagerNotEnoughSpaceError = createCustomErrorClass(
  "ManagerNotEnoughSpace"
);
export const ManagerUninstallBTCDep = createCustomErrorClass(
  "ManagerUninstallBTCDep"
);
export const NetworkDown = createCustomErrorClass("NetworkDown");
export const NoAddressesFound = createCustomErrorClass("NoAddressesFound");
export const NotEnoughBalance = createCustomErrorClass("NotEnoughBalance");
export const NotEnoughBalanceToDelegate = createCustomErrorClass(
  "NotEnoughBalanceToDelegate"
);
export const NotEnoughBalanceInParentAccount = createCustomErrorClass(
  "NotEnoughBalanceInParentAccount"
);
export const NotEnoughSpendableBalance = createCustomErrorClass(
  "NotEnoughSpendableBalance"
);
export const NotEnoughBalanceBecauseDestinationNotCreated = createCustomErrorClass(
  "NotEnoughBalanceBecauseDestinationNotCreated"
);
export const NoAccessToCamera = createCustomErrorClass("NoAccessToCamera");
export const NotEnoughGas = createCustomErrorClass("NotEnoughGas");
export const NotSupportedLegacyAddress = createCustomErrorClass(
  "NotSupportedLegacyAddress"
);
export const GasLessThanEstimate = createCustomErrorClass(
  "GasLessThanEstimate"
);
export const PasswordsDontMatchError = createCustomErrorClass(
  "PasswordsDontMatch"
);
export const PasswordIncorrectError = createCustomErrorClass(
  "PasswordIncorrect"
);
export const RecommendSubAccountsToEmpty = createCustomErrorClass(
  "RecommendSubAccountsToEmpty"
);
export const RecommendUndelegation = createCustomErrorClass(
  "RecommendUndelegation"
);
export const TimeoutTagged = createCustomErrorClass("TimeoutTagged");
export const UnexpectedBootloader = createCustomErrorClass(
  "UnexpectedBootloader"
);
export const MCUNotGenuineToDashboard = createCustomErrorClass(
  "MCUNotGenuineToDashboard"
);
export const RecipientRequired = createCustomErrorClass("RecipientRequired");
export const UnavailableTezosOriginatedAccountReceive = createCustomErrorClass(
  "UnavailableTezosOriginatedAccountReceive"
);
export const UnavailableTezosOriginatedAccountSend = createCustomErrorClass(
  "UnavailableTezosOriginatedAccountSend"
);
export const UpdateYourApp = createCustomErrorClass("UpdateYourApp");
export const UserRefusedDeviceNameChange = createCustomErrorClass(
  "UserRefusedDeviceNameChange"
);
export const UserRefusedAddress = createCustomErrorClass("UserRefusedAddress");
export const UserRefusedFirmwareUpdate = createCustomErrorClass(
  "UserRefusedFirmwareUpdate"
);
export const UserRefusedAllowManager = createCustomErrorClass(
  "UserRefusedAllowManager"
);
export const UserRefusedOnDevice = createCustomErrorClass(
  "UserRefusedOnDevice"
); // TODO rename because it's just for transaction refusal
export const TransportOpenUserCancelled = createCustomErrorClass(
  "TransportOpenUserCancelled"
);
export const TransportInterfaceNotAvailable = createCustomErrorClass(
  "TransportInterfaceNotAvailable"
);
export const TransportWebUSBGestureRequired = createCustomErrorClass(
  "TransportWebUSBGestureRequired"
);
export const DeviceShouldStayInApp = createCustomErrorClass(
  "DeviceShouldStayInApp"
);
export const WebsocketConnectionError = createCustomErrorClass(
  "WebsocketConnectionError"
);
export const WebsocketConnectionFailed = createCustomErrorClass(
  "WebsocketConnectionFailed"
);
export const WrongDeviceForAccount = createCustomErrorClass(
  "WrongDeviceForAccount"
);
export const WrongAppForCurrency = createCustomErrorClass(
  "WrongAppForCurrency"
);
export const ETHAddressNonEIP = createCustomErrorClass("ETHAddressNonEIP");
export const CantScanQRCode = createCustomErrorClass("CantScanQRCode");
export const FeeNotLoaded = createCustomErrorClass("FeeNotLoaded");
export const FeeRequired = createCustomErrorClass("FeeRequired");
export const FeeTooHigh = createCustomErrorClass("FeeTooHigh");
export const SyncError = createCustomErrorClass("SyncError");
export const PairingFailed = createCustomErrorClass("PairingFailed");
export const GenuineCheckFailed = createCustomErrorClass("GenuineCheckFailed");
export const LedgerAPI4xx = createCustomErrorClass("LedgerAPI4xx");
export const LedgerAPI5xx = createCustomErrorClass("LedgerAPI5xx");
export const FirmwareOrAppUpdateRequired = createCustomErrorClass(
  "FirmwareOrAppUpdateRequired"
);

// db stuff, no need to translate
export const NoDBPathGiven = createCustomErrorClass("NoDBPathGiven");
export const DBWrongPassword = createCustomErrorClass("DBWrongPassword");
export const DBNotReset = createCustomErrorClass("DBNotReset");

/**
 * TransportError is used for any generic transport errors.
 * e.g. Error thrown when data received by exchanges are incorrect or if exchanged failed to communicate with the device for various reason.
 */
export function TransportError(message: string, id: string) {
  this.name = "TransportError";
  this.message = message;
  this.stack = new Error().stack;
  this.id = id;
}
//$FlowFixMe
TransportError.prototype = new Error();

addCustomErrorDeserializer(
  "TransportError",
  e => new TransportError(e.message, e.id)
);

export const StatusCodes = {
  PIN_REMAINING_ATTEMPTS: 0x63c0,
  INCORRECT_LENGTH: 0x6700,
  COMMAND_INCOMPATIBLE_FILE_STRUCTURE: 0x6981,
  SECURITY_STATUS_NOT_SATISFIED: 0x6982,
  CONDITIONS_OF_USE_NOT_SATISFIED: 0x6985,
  INCORRECT_DATA: 0x6a80,
  NOT_ENOUGH_MEMORY_SPACE: 0x6a84,
  REFERENCED_DATA_NOT_FOUND: 0x6a88,
  FILE_ALREADY_EXISTS: 0x6a89,
  INCORRECT_P1_P2: 0x6b00,
  INS_NOT_SUPPORTED: 0x6d00,
  CLA_NOT_SUPPORTED: 0x6e00,
  TECHNICAL_PROBLEM: 0x6f00,
  OK: 0x9000,
  MEMORY_PROBLEM: 0x9240,
  NO_EF_SELECTED: 0x9400,
  INVALID_OFFSET: 0x9402,
  FILE_NOT_FOUND: 0x9404,
  INCONSISTENT_FILE: 0x9408,
  ALGORITHM_NOT_SUPPORTED: 0x9484,
  INVALID_KCV: 0x9485,
  CODE_NOT_INITIALIZED: 0x9802,
  ACCESS_CONDITION_NOT_FULFILLED: 0x9804,
  CONTRADICTION_SECRET_CODE_STATUS: 0x9808,
  CONTRADICTION_INVALIDATION: 0x9810,
  CODE_BLOCKED: 0x9840,
  MAX_VALUE_REACHED: 0x9850,
  GP_AUTH_FAILED: 0x6300,
  LICENSING: 0x6f42,
  HALTED: 0x6faa
};

export function getAltStatusMessage(code: number): ?string {
  switch (code) {
    // improve text of most common errors
    case 0x6700:
      return "Incorrect length";
    case 0x6982:
      return "Security not satisfied (dongle locked or have invalid access rights)";
    case 0x6985:
      return "Condition of use not satisfied (denied by the user?)";
    case 0x6a80:
      return "Invalid data received";
    case 0x6b00:
      return "Invalid parameter received";
  }
  if (0x6f00 <= code && code <= 0x6fff) {
    return "Internal error, please report";
  }
}

/**
 * Error thrown when a device returned a non success status.
 * the error.statusCode is one of the `StatusCodes` exported by this library.
 */
export function TransportStatusError(statusCode: number) {
  this.name = "TransportStatusError";
  const statusText =
    Object.keys(StatusCodes).find(k => StatusCodes[k] === statusCode) ||
    "UNKNOWN_ERROR";
  const smsg = getAltStatusMessage(statusCode) || statusText;
  const statusCodeStr = statusCode.toString(16);
  this.message = `Ledger device: ${smsg} (0x${statusCodeStr})`;
  this.stack = new Error().stack;
  this.statusCode = statusCode;
  this.statusText = statusText;
}
//$FlowFixMe
TransportStatusError.prototype = new Error();

addCustomErrorDeserializer(
  "TransportStatusError",
  e => new TransportStatusError(e.statusCode)
);
