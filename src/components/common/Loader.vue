<template>
  <div :class="containerClass">
    <Skeletor v-for="i in tableCount" :height="height" :width="width" :class="skeletonClass" />
  </div>
</template>

<script setup>
import { Skeletor } from 'vue-skeletor'
defineProps({
  containerClass: { type: String, default: '' },
  skeletonClass: { type: String, default: '' },
  height: { type: String, default: '' },
  width: { type: String, default: '' },
  tableCount: { type: Number, default: 10 },
})
</script>
