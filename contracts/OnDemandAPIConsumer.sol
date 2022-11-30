// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./dev/ocr2dr/OCR2DRClient.sol";
// import "@chainlink/contracts/src/v0.8/dev/ocr2dr/OCR2DRClient.sol"; // Once published
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

/**
 * @title On Demand API Consumer contract
 * @notice This contract is a demonstration of using OCR2DR.
 * @notice NOT FOR PRODUCTION USE
 */
contract OnDemandAPIConsumer is OCR2DRClient, ConfirmedOwner {
    using OCR2DR for OCR2DR.Request;

    bytes32 public latestRequestId;
    bytes public latestResponse;
    bytes public latestError;

    event OCRResponse(bytes result, bytes err);

    /**
     * @notice Executes once when a contract is created to initialize state variables
     *
     * @param oracle - The OCR2DROracle contract
     */
    constructor(address oracle)
        OCR2DRClient(oracle)
        ConfirmedOwner(msg.sender)
    {}

    /**
     * @notice Send a simple request
     * @param source JavaScript source code
     * @param secrets Encrypted secrets payload
     * @param args List of arguments accessible from within the source code
     * @param subscriptionId Billing ID
     */
    function executeRequest(
        string calldata source,
        bytes calldata secrets,
        string[] calldata args,
        uint64 subscriptionId,
        uint32 gasLimit
    ) public onlyOwner returns (bytes32) {
        OCR2DR.Request memory req;
        req.initializeRequest(
            OCR2DR.Location.Inline,
            OCR2DR.CodeLanguage.JavaScript,
            source
        );
        if (secrets.length > 0) req.addInlineSecrets(secrets);
        if (args.length > 0) req.addArgs(args);

        bytes32 assignedReqID = sendRequest(
            req,
            subscriptionId,
            gasLimit,
            tx.gasprice
        );
        latestRequestId = assignedReqID;
        return assignedReqID;
    }

    /**
     * @notice Callback that is invoked once the DON has resolved the request or hit an error
     *
     * @param requestId The request ID, returned by sendRequest()
     * @param response Aggregated response from the user code
     * @param err Aggregated error from the user code or from the execution pipeline
     * Either response or error parameter will be set, but never both
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        latestResponse = response;
        latestError = err;
        emit OCRResponse(response, err);
    }
}
