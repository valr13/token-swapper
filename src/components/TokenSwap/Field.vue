<script setup>
defineProps({
  label: String,
  token: String,
  value: String,
  balance: String,
  logo: String,
  disabled: {
    type: Boolean,
    default: false
  }
})

const isNumber = event => {
  const charCode = event.which ? event.which : event.keyCode

  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    event.preventDefault()
  } else {
    return true
  }
};
</script>

<template>
  <div class="c-field">
    <div class="c-field__top">
      <label :for="token">{{ label }}</label>
      <span>Balance: {{ balance }}</span>
    </div>
    <div class="c-field__input" :class="{ '-disabled' : disabled }">
      <input
        type="text"
        :id="token"
        :value="value"
        :disabled="disabled"
        autocomplete="off"
        placeholder="0.00"
        @keypress="isNumber"
      >
      <div class="c-field__token">
        <div class="c-field__tokenImg" :style="`background-image: url(${logo})`"></div>
        <div class="c-field__tokenName">{{ token.toUpperCase() }}</div>
      </div>
    </div>
  </div>
</template>