// SPDX-License-Identifier: MIT
pragma solidity ^0.7.0;

import "./EIP173Proxy.sol";

///@notice Proxy implementing EIP173 for ownership management that accept ETH via receive
contract EIP173ProxyWithReceive is EIP173Proxy {
    constructor(
        address implementationAddress,
        bytes memory data,
        address ownerAddress
    ) payable EIP173Proxy(implementationAddress, data, ownerAddress) {}

    receive() external payable override {}
}
