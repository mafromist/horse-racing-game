<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <button class="button {{$props.buttonClass}}">{{ $props.buttonText }}</button>
  </div>
</template>

<script>
  export default {
    name: 'ButtonItem'
  }
</script>
