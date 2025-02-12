<template>
  <Icon
    :icon="icon"
    :inline="inline"
    :width="width"
    :height="height"
    :flip="flipTransform"
    :rotate="rotate"
    :color="color"
    @load="onLoad"
  />
</template>

<script setup>
import { computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  icon: {
    type: [Object, String],
    required: true,
  },
  inline: {
    type: Boolean,
    default: false,
  },
  width: {
    type: [String, Number],
    default: '1em',
  },
  height: {
    type: [String, Number],
    default: '1em',
  },
  horizontalFlip: {
    type: Boolean,
    default: false,
  },
  verticalFlip: {
    type: Boolean,
    default: false,
  },
  flip: {
    type: String,
    default: '',
  },
  rotate: {
    type: [String, Number],
    default: 0,
  },
  color: {
    type: String,
    default: '',
  },
  onLoad: {
    type: Function,
    default: null,
  },
})
const flipTransform = computed(() => {
  let flipValue = props.flip.toLowerCase()
  if (props.horizontalFlip) flipValue += ' horizontal'
  if (props.verticalFlip) flipValue += ' vertical'
  return flipValue.trim() || undefined
})
</script>
