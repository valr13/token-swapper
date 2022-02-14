import { ref } from 'vue'

import {
  getProvider,
  getSigner,
  getDexContract,
  getTokenContract,
  convertToBigNumber,
} from '@/utils/ethereumFunctions'

const DEX_ADDRESS = import.meta.env.VITE_DEX_ADDRESS

export function useSwap (amount, store) {
  const success = ref(false)
  const loading = ref(false)

  const provider = getProvider()
  const signer = getSigner(provider)

  const dexContract = getDexContract(signer)
  const tokenContract = getTokenContract(signer)

  /**
   * Buy function
   */
  const buy = async () => {
    success.value = false
    loading.value = true

    try {
      const value = convertToBigNumber(amount.value)

      const transaction = await dexContract.buy({ value })
      await transaction.wait()
  
      store.getBalances()
      
      success.value = true
      loading.value = false
    } catch (err) {
      console.log(err)
      loading.value = false
    }
  }

  /**
   * Sell function
   */
  const sell = async () => {
    success.value = false
    loading.value = true

    try {
      const value = convertToBigNumber(amount.value)
      const allowance = await tokenContract.allowance(store.account, DEX_ADDRESS)

      if (value > allowance) {
        const approved = await tokenContract.approve(DEX_ADDRESS, value)
        await approved.wait()
      }

      const transaction = await dexContract.sell(value)
      await transaction.wait()

      store.getBalances()
  
      success.value = true
      loading.value = false
    } catch (err) {
      console.log(err)
      loading.value = false
    }
  }
  
  return {
    buy,
    sell,
    success,
    loading
  }
}