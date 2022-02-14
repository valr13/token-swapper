// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./Token.sol";

contract Dex {
  IERC20 public token;

  event Buy(uint256 amount);
  event Sell(uint256 amount);

  constructor() {
    token = new Token();
  }

  function buy() payable public {
    uint256 amountToBuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));

    require(amountToBuy > 0, "You need to send ETH to buy tokens");
    require(amountToBuy <= dexBalance, "Not enough tokens in the reserve");
    
    token.transfer(msg.sender, amountToBuy);
    emit Buy(amountToBuy);
  }

  function sell(uint256 amount) public {
    require(amount > 0, "You need to send at least some tokens");
  
    uint256 balance = token.balanceOf(msg.sender);
    uint256 allowance = token.allowance(msg.sender, address(this));

    require(amount <= balance, "Not enough tokens");
    require(amount <= allowance, "Not allowed to sell this amount");

    token.transferFrom(msg.sender, address(this), amount);
    (bool success, ) = payable(msg.sender).call{ value: amount }("");

    require(success, "Transaction failed");

    emit Sell(amount);
  }
}