<script setup>
defineProps({
  label: String,
  classes: String,
  onClick: Function,
  modifiers: String,
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <button 
    type="button" 
    @click="onClick" 
    :disabled="loading || disabled"
    class="c-button" 
    :class="[
      modifiers, 
      classes, 
      { '-disabled' : disabled },
      { '-pointer-none' : loading }
    ]" 
  >
    <div class="c-button__loader" v-if="loading">
      <span></span>
      <span>Loading...</span>
    </div>
    <span v-else>{{ label }}</span>
  </button>
</template>