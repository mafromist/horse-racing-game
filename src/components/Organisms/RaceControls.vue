<template>
  <div class="race-controls">
    <GenerateRace />
    <ResetRace />
  </div>
</template>

<script>
import GenerateRace from '@/components/Molecules/GenerateRace.vue';
import ResetRace from '@/components/Molecules/ResetRace.vue';

  export default {
    components: {
      GenerateRace,
      ResetRace
    }
  }
</script>
