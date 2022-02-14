<script setup>
import Navbar from '@/components/Navbar/Index.vue'
import TokenSwap from '@/components/TokenSwap/Index.vue'
import MetamaskChecker from '@/components/MetamaskChecker/Index.vue'
</script>

<template>
  <Navbar />

  <div class="c-page">
    <TokenSwap />
  </div>

  <MetamaskChecker />
</template>