// SPDX-License-Identifier: MIT
pragma solidity ^0.7.1;
pragma experimental ABIEncoderV2;

/******************************************************************************\
* Author: Nick Mudge
*
* Implementation of an example of a diamond.
/******************************************************************************/

import "./libraries/LibDiamondStorage.sol";
import "./libraries/LibDiamondCut.sol";
import "./facets/OwnershipFacet.sol";
import "./facets/DiamondCutFacet.sol";
import "./facets/DiamondLoupeFacet.sol";

contract Diamond {
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor(address owner) payable {
        LibDiamondStorage.DiamondStorage storage ds = LibDiamondStorage.diamondStorage();
        ds.contractOwner = owner;
        emit OwnershipTransferred(address(0), owner);

        DiamondCutFacet diamondCutFacet = new DiamondCutFacet();

        DiamondLoupeFacet diamondLoupeFacet = new DiamondLoupeFacet();

        // Create a OwnershipFacet contract which implements the ERC-173 Ownership interface
        OwnershipFacet ownershipFacet = new OwnershipFacet();

        IDiamondCut.Facet[] memory diamondCut = new IDiamondCut.Facet[](3);

        // adding diamondCut function
        diamondCut[0].facetAddress = address(diamondCutFacet);
        diamondCut[0].functionSelectors = new bytes4[](1);
        diamondCut[0].functionSelectors[0] = DiamondCutFacet.diamondCut.selector;

        // adding diamond loupe functions
        diamondCut[1].facetAddress = address(diamondLoupeFacet);
        diamondCut[1].functionSelectors = new bytes4[](5);
        diamondCut[1].functionSelectors[0] = DiamondLoupeFacet.facetFunctionSelectors.selector;
        diamondCut[1].functionSelectors[1] = DiamondLoupeFacet.facets.selector;
        diamondCut[1].functionSelectors[2] = DiamondLoupeFacet.facetAddress.selector;
        diamondCut[1].functionSelectors[3] = DiamondLoupeFacet.facetAddresses.selector;
        diamondCut[1].functionSelectors[4] = DiamondLoupeFacet.supportsInterface.selector;

        // adding ownership functions
        diamondCut[2].facetAddress = address(ownershipFacet);
        diamondCut[2].functionSelectors = new bytes4[](2);
        diamondCut[2].functionSelectors[0] = OwnershipFacet.transferOwnership.selector;
        diamondCut[2].functionSelectors[1] = OwnershipFacet.owner.selector;

        // execute non-standard internal diamondCut function to add functions
        LibDiamondCut.diamondCut(diamondCut);

        // adding ERC165 data
        // ERC165
        ds.supportedInterfaces[IERC165.supportsInterface.selector] = true;

        // DiamondCut
        ds.supportedInterfaces[DiamondCutFacet.diamondCut.selector] = true;

        // DiamondLoupe
        bytes4 interfaceID = IDiamondLoupe.facets.selector ^
            IDiamondLoupe.facetFunctionSelectors.selector ^
            IDiamondLoupe.facetAddresses.selector ^
            IDiamondLoupe.facetAddress.selector;
        ds.supportedInterfaces[interfaceID] = true;

        // ERC173
        ds.supportedInterfaces[IERC173.transferOwnership.selector ^ IERC173.owner.selector] = true;
    }

    // Find facet for function that is called and execute the
    // function if a facet is found and return any value.
    fallback() external payable {
        LibDiamondStorage.DiamondStorage storage ds;
        bytes32 position = LibDiamondStorage.DIAMOND_STORAGE_POSITION;
        assembly {
            ds.slot := position
        }
        address facet = ds.selectorToFacetAndPosition[msg.sig].facetAddress;
        require(facet != address(0), "Diamond: Function does not exist");
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
                case 0 {
                    revert(0, returndatasize())
                }
                default {
                    return(0, returndatasize())
                }
        }
    }

    receive() external payable {}
}
