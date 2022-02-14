import { ref } from 'vue'

import ethLogo from '@/assets/eth-logo.png'
import valrLogo from '@/assets/valr-logo.png'

export function useData(mode, isMode) {
  const modes = ref([
    {
      id: 'buy',
      label: 'Buy',
      onClick: () => mode.value = 'buy'
    },
    {
      id: 'sell',
      label: 'Sell',
      onClick: () => mode.value = 'sell'
    }
  ])

  const fields = ref([
    {
      label: 'Input',
      onInput: 'onInput',
      token: isMode('buy').value ? 'eth' : 'valr',
      logo: isMode('buy').value ? ethLogo : valrLogo
    },
    {
      label: 'Output',
      onInput: null,
      token: isMode('buy').value ? 'valr' : 'eth',
      logo: isMode('buy').value ? valrLogo : ethLogo
    },
  ])

  return {
    modes,
    fields
  }
}