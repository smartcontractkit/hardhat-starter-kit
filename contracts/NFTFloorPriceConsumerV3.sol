// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract NFTFloorPriceConsumerV3 {
    AggregatorV3Interface internal nftFloorPriceFeed;

    /**
     * Network: Goerli
     * Aggregator: CryptoPunks
     * Address: 0x5c13b249846540F81c093Bc342b5d963a7518145
     */
    constructor() {
        nftFloorPriceFeed = AggregatorV3Interface(
            0x5c13b249846540F81c093Bc342b5d963a7518145
        );
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int256) {
        (
            ,
            /*uint80 roundID*/
            int256 nftFloorPrice, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = nftFloorPriceFeed.latestRoundData();
        return nftFloorPrice;
    }
}
