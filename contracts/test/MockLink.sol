// SPDX-License-Identifier: MIT
pragma solidity ^0.6.6;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

abstract contract ERC677Receiver {
  function onTokenTransfer(address _sender, uint _value, bytes memory _data) public virtual;
}

contract MockLink is ERC20 {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);


    constructor() public ERC20("MockLink", "LINK") {
        _mint(msg.sender, 100*10**18);
    }

    function transferAndCall(address _to, uint _value, bytes memory _data)
    public
    virtual
    returns (bool success)
  {
    super.transfer(_to, _value);
    emit Transfer(msg.sender, _to, _value, _data);
    if (isContract(_to)) {
      contractFallback(_to, _value, _data);
    }
    return true;
  }

  function isContract(address _addr)
    private
    view
    returns (bool hasCode)
  {
    uint length;
    assembly { length := extcodesize(_addr) }
    return length > 0;
  }

    function contractFallback(address _to, uint _value, bytes memory _data)
    private
  {
    ERC677Receiver receiver = ERC677Receiver(_to);
    receiver.onTokenTransfer(msg.sender, _value, _data);
  }
}
