<script setup>
import identicon from 'ethereum-blockies-base64'
defineProps({ account: String });
</script>

<template>
  <div class="c-identicon" :style="`background-image: url(${identicon(account)})`"></div>
</template>