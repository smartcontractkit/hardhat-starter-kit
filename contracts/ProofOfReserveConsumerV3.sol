// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract ReserveConsumerV3 {

    AggregatorV3Interface internal reserveFeed;

    /**
     * Network: Ethereum Mainnet
     * Aggregator: WBTC PoR
     * Address: 0xa81FE04086865e63E12dD3776978E49DEEa2ea4e
     */
    constructor() {
        reserveFeed = AggregatorV3Interface(0xa81FE04086865e63E12dD3776978E49DEEa2ea4e);
    }

    /**
     * Returns the latest price
     */
    function getLatestReserve() public view returns (int) {
        (
            /*uint80 roundID*/,
            int reserve,
            /*uint startedAt*/,
            /*uint timeStamp*/,
            /*uint80 answeredInRound*/
        ) = reserveFeed.latestRoundData();
        return reserve;
    }
}
