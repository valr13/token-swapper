import { Contract, ethers } from 'ethers'

import DEX from '@/artifacts/contracts/Dex.sol/Dex.json'
import TOKEN from '@/artifacts/contracts/Token.sol/Token.json'

const DEX_ADDRESS = import.meta.env.VITE_DEX_ADDRESS
const TOKEN_ADDRESS = import.meta.env.VITE_TOKEN_ADDRESS

export function getProvider() {
  return new ethers.providers.Web3Provider(window.ethereum)
}

export function getSigner(provider) {
  return provider.getSigner()
}

export async function getNetwork(provider) {
  const network = await provider.getNetwork()
  return network.chainId
}

export async function connectAccount() {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts'
  })

  return accounts[0]
}

export async function fetchAccount() {
  const accounts = await window.ethereum.request({
    method: 'eth_accounts'
  })

  return accounts[0]
}

export async function getEthBalance(provider, account) {
  const balanceBigNumber = await provider.getBalance(account)
  const balanceInEth = convertToEther(balanceBigNumber.toString())
  const formattedBalance = balanceInEth.slice(0, balanceInEth.indexOf('.') + 3)

  return formattedBalance
}

export async function getValrBalance(signer, account) {
  const tokenContract = getTokenContract(signer)
  const balanceBigNumber = await tokenContract.balanceOf(account)
  const balanceInEth = convertToEther(balanceBigNumber)
  
  return balanceInEth
}

export function convertToBigNumber(amount) {
  return ethers.utils.parseEther(amount)
}

export function convertToEther(amount) {
  return ethers.utils.formatEther(amount)
}

export function getDexContract(signer) {
  return new Contract(DEX_ADDRESS, DEX.abi, signer)
}

export function getTokenContract(signer) {
  return new Contract(TOKEN_ADDRESS, TOKEN.abi, signer)
}