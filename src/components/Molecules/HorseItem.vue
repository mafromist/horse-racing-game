<template>
  <div class="horse">
    <p class="horse-name">
      Horse {{ horse?.number }}
    </p>
    <IconHorse :color="horse?.color" />
    <p v-if="showPP" class="horse-performance-point">
      {{ horse.performancePoint }}
    </p>
  </div>
</template>

<script>
import IconHorse from '@/components/Atoms/IconHorse.vue';
export default {
  name: 'HorseItem',
  components: {
    IconHorse,
  },
  props: {
    horse: {
      type: Object,
      required: true,
    },
    showPP: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
