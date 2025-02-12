<template>
  <div class="alert" :class="`alert-${type}`" role="alert">
    <p class="my-0 py-0">{{ message }}</p>
  </div>
</template>

<script setup>
defineProps({
  type: { type: String },
  message: { type: String },
})
</script>
