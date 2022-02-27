// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/**
 * @title The PriceConsumerV3 contract
 * @notice Acontract that returns latest price from Chainlink Price Feeds
 */
contract PriceConsumerV3 {
  AggregatorV3Interface internal priceFeed;

  /**
   * @notice Executes once when a contract is created to initialize state variables
   *
   * @param _priceFeed - Price Feed Address
   *
   * Network: Kovan
   * Aggregator: ETH/USD
   * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
   */
  constructor(address _priceFeed) public {
    priceFeed = AggregatorV3Interface(_priceFeed);
  }

  /**
   * @notice Returns the latest price
   *
   * @return latest price
   */
  function getLatestPrice() public view returns (int256) {
    (
      uint80 roundID,
      int256 price,
      uint256 startedAt,
      uint256 timeStamp,
      uint80 answeredInRound
    ) = priceFeed.latestRoundData();
    return price;
  }

  /**
   * @notice Returns the Price Feed address
   *
   * @return Price Feed address
   */
  function getPriceFeed() public view returns (AggregatorV3Interface) {
    return priceFeed;
  }
}
