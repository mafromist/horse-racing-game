<template>
  <div class="race-controls">
    <GenerateRace />
    <ResetRace />
    <StartPauseRace />
  </div>
</template>

<script>
import GenerateRace from '@/components/Molecules/GenerateRace.vue';
import ResetRace from '@/components/Molecules/ResetRace.vue';
import StartPauseRace from '@/components/Molecules/StartPauseRace.vue';

export default {
  components: {
    GenerateRace,
    ResetRace,
    StartPauseRace,
  },
};
</script>
