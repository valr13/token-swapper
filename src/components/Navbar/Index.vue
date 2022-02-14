<script setup> 
import Identicon from './Identicon.vue'
import Button from '@/components/Button/Index.vue'

import { useEthereumStore } from '@/stores/ethereum'

const appName = import.meta.env.VITE_APP_NAME
const store = useEthereumStore();
</script>

<template>
  <nav class="c-nav">
    <div class="c-nav__container o-container">
      <h1 class="c-heading -h4">{{ appName }}</h1>
      <div class="c-nav__actions">
        <div class="c-nav__action">
          <Button 
            :onClick="!store.account ? store.connectAccount : null" 
            :label="store.account ? store.shortAddress : 'Connect Account'" 
          />
        </div>
        <div class="c-nav__action">
          <Button :label="`${store.balances.eth} ETH`" modifiers="-alternative -pointer-none" />
        </div>
        <div class="c-nav__action -flex" v-if="store.account">
          <Identicon :account="store.account" />
        </div>
      </div>
    </div>
  </nav>
</template>