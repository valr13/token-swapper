import { defineStore } from 'pinia'
import { 
  getProvider,
  getSigner,
  fetchAccount, 
  getEthBalance, 
  getValrBalance,
  connectAccount, 
} from '@/utils/ethereumFunctions'

export const useEthereumStore = defineStore('ethereum', {
  state: () => ({
    account: null,
    balances: {
      eth: "0",
      valr: "0"
    }
  }),

  getters: {
    getAddress: (state) => state.account,
  
    shortAddress: (state) => {
      const stringToReplace = state.account.slice(4, 38)
      return state.account.replace(stringToReplace, '...')
    }
  },

  actions: {
    async connectAccount() {
      this.account = await connectAccount()
    },

    async fetchAccount() {
      this.account = await fetchAccount()

      if (this.account) {
        await this.getBalances()
      }
    },

    async getBalances() {
      const provider = getProvider()
      const signer = getSigner(provider)

      this.balances.eth = await getEthBalance(provider, this.account)
      this.balances.valr = await getValrBalance(signer, this.account)
    },

    async setAccount(account) {
      this.account = account

      if (this.account) {
        await this.getBalances()
      }
    },

    setChainId(chainId) {
      this.setChainId = chainId
    },

    resetAccount() {
      this.account = null
      this.balances = { eth: 0, valr: 0 }
    }
  }
})