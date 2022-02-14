//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

interface IERC20 {
    function totalSupply() external view returns (uint);
    function balanceOf(address account) external view returns (uint);
    function allowance(address owner, address spender) external view returns (uint);

    function approve(address spender, uint amount) external returns (bool);
    function transfer(address recipient, uint amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint amount) external returns (bool);
}

contract Token is IERC20 {
    string public constant name = "Valr Token";
    string public constant symbol = "VALR";

    uint8 public constant decimals = 18;
    uint256 private _totalSupply = 1000000 * (10 ** uint(decimals));

    mapping (address => uint256) balances;
    mapping (address => mapping(address => uint256)) allowances;

    event Transfer(address indexed from, address indexed to, uint256 amount);
    event Approval(address indexed owner, address indexed spender, uint256 amount);

    constructor() {
        balances[msg.sender] = _totalSupply;
    }

    function totalSupply() public view override returns (uint) {
        return _totalSupply;
    }

    function balanceOf(address account) public view override returns (uint) {
        return balances[account];
    }

    function allowance(address owner, address spender) public view override returns (uint) {
        return allowances[owner][spender];
    }

    function approve(address spender, uint amount) public override returns (bool) {
        allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);

        return true;
    }

    function transfer(address recipient, uint amount) public override returns (bool) {
        require(amount <= balances[msg.sender], "Not enough funds");

        balances[msg.sender] -= amount;
        balances[recipient] += amount;

        emit Transfer(msg.sender, recipient, amount);

        return true;
    }

    function transferFrom(address sender, address recipient, uint amount) public override returns (bool) {
        require(amount <= balances[sender], "Not enough funds");
        require(amount <= allowances[sender][msg.sender]);

        balances[sender] -= amount;
        balances[recipient] += amount;
        allowances[sender][msg.sender] -= amount;

        emit Transfer(sender, recipient, amount);

        return true;
    }
}
