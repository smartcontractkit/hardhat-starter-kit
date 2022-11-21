// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

/**
 * @title OCR2DR billing subscription registry interface.
 */
interface OCR2DRRegistryInterface {
    struct RequestBilling {
        // a unique subscription ID allocated by billing system,
        uint64 subscriptionId;
        // the client contract that initiated the request to the DON
        // to use the subscription it must be added as a consumer on the subscription
        address client;
        // customer specified gas limit for the fulfillment callback
        uint32 gasLimit;
    }

    /**
     * @notice Get configuration relevant for making requests
     * @return uint32 global max for request gas limit
     * @return address[] list of registered DONs
     */
    function getRequestConfig()
        external
        view
        returns (uint32, address[] memory);

    /**
     * @notice Determine the charged fee that will be paid to the Registry owner
     * @param data Encoded OCR2DR request data, use OCR2DRClient API to encode a request
     * @param billing The request's billing configuration
     * @return fee Cost in Juels (1e18) of LINK
     */
    function getRequiredFee(
        bytes calldata data,
        OCR2DRRegistryInterface.RequestBilling memory billing
    ) external view returns (uint96);

    /**
     * @notice Estimate the execution cost in gas that will be reimbursed to the Node Operator who transmits the data on-chain
     * @param billing The request's billing configuration
     * @return gasAmount
     */
    function estimateExecutionGas(
        OCR2DRRegistryInterface.RequestBilling memory billing
    ) external view returns (uint256);

    /**
     * @notice Estimate the total cost to make a request: gas re-imbursement, plus DON fee, plus Registry fee
     * @param data Encoded OCR2DR request data, use OCR2DRClient API to encode a request
     * @param billing The request's billing configuration
     * @param donRequiredFee Fee charged by the DON that is paid to Oracle Node
     * @return billedCost Cost in Juels (1e18) of LINK
     */
    function estimateCost(
        bytes calldata data,
        OCR2DRRegistryInterface.RequestBilling memory billing,
        uint96 donRequiredFee
    ) external view returns (uint96);

    /**
     * @notice Initiate the billing process for an OCR2DR request
     * @param data Encoded OCR2DR request data, use OCR2DRClient API to encode a request
     * @param billing Billing configuration for the request
     * @return requestId - A unique identifier of the request. Can be used to match a request to a response in fulfillRequest.
     * @dev Only callable by an OCR2DROracle that has been approved on the Registry
     */
    function startBilling(bytes calldata data, RequestBilling calldata billing)
        external
        returns (bytes32);

    /**
     * @notice Finalize billing process for an OCR2DR request by sending a callback to the Client contract and then charging the subscription
     * @param requestId identifier for the request that was generated by the Registry in the beginBilling commitment
     * @param response response data from DON consensus
     * @param err error from DON consensus
     * @param transmitter the Oracle who sent the report
     * @param signers the Oracles who had a part in generating the report
     * @param signerCount the number of signers on the report
     * @param reportValidationGas the amount of gas used for the report validation. Cost is split by all fulfillments on the report.
     * @param initialGas the initial amount of gas that should be used as a baseline to charge the single fulfillment for execution cost
     * @return success whether the callback was successsful
     * @dev Only callable by OCR2DROracles that have been approved on the Registry
     * @dev simulated offchain to determine if sufficient balance is present to fulfill the request
     */
    function fulfillAndBill(
        bytes32 requestId,
        bytes calldata response,
        bytes calldata err,
        address transmitter,
        address[31] memory signers, // 31 comes from OCR2Abstract.sol's maxNumOracles constant
        uint8 signerCount,
        uint256 reportValidationGas,
        uint256 initialGas
    ) external returns (bool success);

    /**
     * @notice Get request commitment hash
     * @param requestId id of request
     * @return commitmentHash the keccack32 hash of the commitment
     * @dev used to determine if a request is fulfilled or not
     */
    function getCommitment(bytes32 requestId)
        external
        view
        returns (
            address,
            uint64,
            uint32
        );
}
