<template>
  <component :is="tag" class="text-item" :class="customClass" >
    <slot></slot>
  </component>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  tag: {
    type: String,
    required: true,
    default: 'p',
  },
  customClass: {
    type: String,
    default: '',
  },
});
</script>
