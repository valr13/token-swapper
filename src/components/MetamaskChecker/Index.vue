<script setup>
import { useEthereumStore } from '@/stores/ethereum'
import { onMounted } from 'vue'

const ethereum = useEthereumStore()

onMounted(() => {
  ethereum.fetchAccount()
  addEventListeners()
})

const onChainChanged = chainId => {
  ethereum.setChainId(chainId)
}

const onAccountsChanged = accounts => {
  accounts.length > 0 ? ethereum.setAccount(accounts[0]) : ethereum.resetAccount()
}

const addEventListeners = () => {
  window.ethereum.on('chainChanged', chainId => onChainChanged(chainId))
  window.ethereum.on('accountsChanged', accounts => onAccountsChanged(accounts))
}
</script>

<template>
  <div class="c-metamask-checker" hidden aria-hidden="false"></div>
</template>