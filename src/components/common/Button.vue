<template>
  <button
    :disabled="loading"
    :type="type"
    :class="class"
    class="d-flex justify-content-center align-items-center"
    @click="$emit('callFunction')"
  >
    <span
      v-if="loading"
      class="spinner-border spinner-border-sm mx-1 text-white"
    ></span>
    <span>{{ buttonText }}</span>
    <slot />
  </button>
</template>

<script setup>
defineProps({
  loading: { type: Boolean, default: false },
  buttonText: { type: String, default: "" },
  class: { type: String, default: "" },
  type: { type: String, default: "" },
});
</script>
