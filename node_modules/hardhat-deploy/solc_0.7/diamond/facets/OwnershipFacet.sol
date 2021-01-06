// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;
pragma experimental ABIEncoderV2;

/******************************************************************************\
* Author: Nick Mudge <nick@perfectabstractions.com> (https://twitter.com/mudgen)
/******************************************************************************/

import "../libraries/LibDiamondStorage.sol";
import "../interfaces/IERC173.sol";

contract OwnershipFacet is IERC173 {
    function transferOwnership(address newOwner) external override {
        LibDiamondStorage.DiamondStorage storage ds = LibDiamondStorage.diamondStorage();
        address currentOwner = ds.contractOwner;
        require(msg.sender == currentOwner, "Must own the contract.");
        ds.contractOwner = newOwner;
        emit OwnershipTransferred(currentOwner, newOwner);
    }

    function owner() external override view returns (address) {
        LibDiamondStorage.DiamondStorage storage ds = LibDiamondStorage.diamondStorage();
        return ds.contractOwner;
    }
}
