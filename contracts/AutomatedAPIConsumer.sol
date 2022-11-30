// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./dev/ocr2dr/OCR2DRClient.sol";
// import "@chainlink/contracts/src/v0.8/dev/ocr2dr/OCR2DRClient.sol"; // Once published
import "@chainlink/contracts/src/v0.8/interfaces/KeeperCompatibleInterface.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";
import "hardhat/console.sol";

/**
 * @title Automated API Consumer contract
 * @notice This contract is a demonstration of using OCR2DR along with Chainlink Automation.
 * @notice NOT FOR PRODUCTION USE
 */
contract AutomatedAPIConsumer is
    OCR2DRClient,
    KeeperCompatibleInterface,
    ConfirmedOwner
{
    using OCR2DR for OCR2DR.Request;

    uint64 private constant MY_SUBSCRIPTION_ID = 2;
    uint32 private constant MY_GAS_LIMIT = 100_000;

    OCR2DR.Request public request;
    bool public reqInFlight;
    bytes public value;

    /**
     * Use an interval in seconds and a timestamp to slow execution of Upkeep
     */
    uint256 public immutable interval;
    uint256 public lastTimeStamp;

    event FulfillRequestInvoked(bytes32 requestId, bytes response, bytes err);
    event ExecuteRequestInvoked(bytes32 requestId);

    /**
     * @notice Executes once when a contract is created to initialize state variables
     *
     * @param oracle - The OCR2DROracle contract
     * @param source - The user provided source code
     * @param args - The array of args
     * @param secrets - Encrypted secrets blob
     * @param updateInterval - Period of time between two counter increments expressed as UNIX timestamp value
     */
    constructor(
        address oracle,
        string memory source,
        string[] memory args,
        bytes memory secrets,
        uint256 updateInterval
    ) OCR2DRClient(oracle) ConfirmedOwner(msg.sender) {
        request.initializeRequest(
            OCR2DR.Location.Inline,
            OCR2DR.CodeLanguage.JavaScript,
            source
        );
        if (secrets.length > 0) request.addInlineSecrets(secrets);
        if (args.length > 0) request.addArgs(args);
        reqInFlight = false;

        interval = updateInterval;
        lastTimeStamp = block.timestamp;
    }

    /**
     * @notice Sets the codeLocation and code on the request
     *
     * @param location The user provided source code location
     * @param language The programming language of the user code
     * @param source The user provided source code or a url
     */
    function setSource(
        OCR2DR.Location location,
        OCR2DR.CodeLanguage language,
        string memory source
    ) public onlyOwner {
        request.initializeRequest(location, language, source);
    }

    /**
     * @notice Adds args for the user run function
     *
     * @param args The array of args (must not be empty)
     */
    function setArgs(string[] memory args) public onlyOwner {
        request.addArgs(args);
    }

    /**
     * @notice Adds user encrypted secrets to a Request
     *
     * @param secrets The user encrypted secrets (must not be empty)
     */
    function setInlineSecrets(bytes memory secrets) public onlyOwner {
        request.addInlineSecrets(secrets);
    }

    /**
     * @notice Sends request to be serviced by the DON
     *
     * @return assignedReqID An identifier generated for this request execution
     */
    function executeRequest() internal returns (bytes32) {
        bytes32 assignedReqID = sendRequest(
            request,
            MY_SUBSCRIPTION_ID,
            MY_GAS_LIMIT,
            tx.gasprice
        );
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
        console.logBytes32(requestId);
        console.logBytes(response);
        console.logBytes(err);
        emit FulfillRequestInvoked(requestId, response, err);
        if (err.length != 0) value = response;
        reqInFlight = false;
    }

    /**
     * @notice Checks if the contract requires work to be done
     */
    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        require(reqInFlight == false, "Request is already in flight");
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
        // We don't use the checkData in this example. The checkData is defined when the Upkeep was registered.
    }

    /**
     * @notice Performs the work on the contract, if instructed by :checkUpkeep():
     */
    function performUpkeep(
        bytes calldata /* performData */
    ) external override {
        // add some verification
        (bool upkeepNeeded, ) = checkUpkeep("");
        require(upkeepNeeded, "Time interval not met");

        lastTimeStamp = block.timestamp;
        executeRequest();
        // We don't use the performData in this example. The performData is generated by the Keeper's call to your checkUpkeep function
    }
}
