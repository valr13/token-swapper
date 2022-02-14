<script setup>
import Field from './Field.vue'
import Button from '@/components/Button/Index.vue'

import ethLogo from '@/assets/eth-logo.png'
import valrLogo from '@/assets/valr-logo.png'

import { useSwap } from './composables/swap'
import { useEthereumStore } from '@/stores/ethereum'
import { computed, ref, watch } from 'vue'

const modes = {
  BUY: 'buy',
  SELL: 'sell'
}

const store = useEthereumStore()

const input = ref(null)
const output = ref(null)
const error = ref(null)
const mode = ref(modes.BUY)

const isMode = value => computed(() => mode.value === value)

const { 
  buy, 
  sell, 
  loading, 
  success 
} = useSwap(input, store)

const resetFields = () => {
  error.value = null
  input.value = output.value = null
}

const onInput = ({ target }) => {
  input.value = output.value = target.value
  checkBalanceErrors()
}

const checkBalanceErrors = () => {
  const isInsufficientEth = mode.value === modes.BUY && Number(input.value) > Number(store.balances.eth)
  const isInsufficientValr = mode.value === modes.SELL && Number(input.value) > Number(store.balances.valr)

  isInsufficientEth || isInsufficientValr ? setError('Insufficient funds') : setError(null)
}

const setError = msg => {
  error.value = msg
}

watch([mode, success], ([modeValue, successValue]) => {
  if (modeValue || successValue) resetFields()
});
</script>

<template>
  <div class="c-swap">
    <div class="c-swap__modes">
      <div class="c-swap__mode">
        <Button 
          label="Buy" 
          classes="-xs"
          :onClick="() => mode = modes.BUY" 
          :modifiers="isMode(modes.BUY).value ? '-dark' : '-naked'" 
        />
      </div>
      <div class="c-swap__mode">
        <Button 
          label="Sell"
          classes="-xs" 
          :onClick="() => mode = modes.SELL" 
          :modifiers="isMode(modes.SELL).value ? '-dark' : '-naked'" 
        />
      </div>
    </div>

    <div class="c-swap__fields">
      <div class="c-swap__field">
        <Field 
          label="Input" 
          @input="onInput"
          :token="isMode(modes.BUY).value ? 'eth' : 'valr'" 
          :logo="isMode(modes.BUY).value ? ethLogo : valrLogo"
          :balance="isMode(modes.BUY).value ? store.balances.eth : store.balances.valr" 
        />
      </div>
      <div class="c-swap__field">
        <Field 
          label="Output" 
          :disabled="true"
          :value="output" 
          :token="isMode(modes.BUY).value ? 'valr' : 'eth'"
          :logo="isMode(modes.BUY).value ? valrLogo : ethLogo"
          :balance="isMode(modes.BUY).value ? store.balances.valr : store.balances.eth" 
        />
      </div>
    </div>

    <div class="c-swap__error" v-if="error">
      {{ error }}
    </div>

    <div class="c-swap__action">
      <Button 
        label="Swap" 
        modifiers="-fullwidth" 
        :loading="loading"
        :disabled="error != null"
        :onClick="isMode(modes.BUY).value ? buy : sell"
      />
    </div>
  </div>
</template>