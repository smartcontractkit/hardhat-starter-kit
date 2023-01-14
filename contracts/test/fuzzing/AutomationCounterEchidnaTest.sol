// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {AutomationCounter} from "../../AutomationCounter.sol";

contract AutomationCounterEchidnaTest is AutomationCounter {
    constructor() AutomationCounter(8 days) {}

    function echidna_test_perform_upkeep_gate() public view returns (bool) {
        return counter == 0;
    }
}
