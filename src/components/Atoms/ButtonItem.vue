<template>
  <div>
    <button class="button" :class="$props.buttonClass">
      {{ $props.buttonText }}
    </button>
  </div>
</template>

<script setup>
  import { defineProps } from 'vue';

  defineProps({
    buttonClass: {
      type: String,
      required: false,
    },
    buttonText: {
      type: String,
      required: true,
      default: 'Click Button',
    },
  });

</script>
