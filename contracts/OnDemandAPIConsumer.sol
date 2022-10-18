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
    using OCR2DR for OCR2DR.HttpQuery;
    using OCR2DR for OCR2DR.HttpHeader;

    uint256 private constant MY_SUBSCRIPTION_ID = 1;

    bool public reqInFlight;
    bytes public value;

    event FulfillRequestInvoked(bytes32 requestId, bytes response, bytes err);
    event ExecuteRequestInvoked(bytes32 requestId);

    /**
     * @notice Executes once when a contract is created to initialize state variables
     *
     * @param oracle - The OCR2DROracle contract
     */
    constructor(address oracle) OCR2DRClient(oracle) ConfirmedOwner(msg.sender) {}

    /**
     * @notice Sends request to be serviced by the DON
     *
     * @return assignedReqID An identifier generated for this request execution
     */
    function executeRequest(
        string memory source,
        string[] memory args,
        OCR2DR.HttpQuery[] memory queries,
        bytes memory secrets
    ) public onlyOwner returns (bytes32) {
        require(reqInFlight == false, "Request is already in flight");

        OCR2DR.Request memory request;
        request.initializeRequest(OCR2DR.Location.Inline, OCR2DR.CodeLanguage.JavaScript, source);
        if (secrets.length > 0) request.addInlineSecrets(secrets);
        if (args.length > 0) request.addArgs(args);
        if (queries.length > 0) request.setHttpQueries(queries);

        bytes32 assignedReqID = sendRequest(request, MY_SUBSCRIPTION_ID);
        reqInFlight = true;
        emit ExecuteRequestInvoked(assignedReqID);
        return assignedReqID;
    }

    /**
     * @notice Callback that is invoked once the DON has resolved the request or hit an error
     *
     * @param requestId - Period of time between two counter increments expressed as UNIX timestamp value
     * @param response - Period of time between two counter increments expressed as UNIX timestamp value
     * @param err - Period of time between two counter increments expressed as UNIX timestamp value
     */
    function fulfillRequest(
        bytes32 requestId,
        bytes memory response,
        bytes memory err
    ) internal override {
        emit FulfillRequestInvoked(requestId, response, err);
        if (err.length == 0) value = response;
        reqInFlight = false;
    }
}
