<template>
  <div>
    <button class="button" :class="$props.buttonClass">
      {{ $props.buttonText }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'ButtonItem',
  props: {
    buttonClass: {
      type: String,
      required: false,
    },
    buttonText: {
      type: String,
      required: true,
      default: 'Click Button',
    },
  },
};
</script>
