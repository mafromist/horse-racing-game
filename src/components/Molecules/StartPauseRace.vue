<template>
  <ButtonItem
    v-if="isGenerated"
    buttonClass="button button--big"
    :buttonText="isRaceStarted ? 'Pause The Race' : 'Start The Race'"
    :style="{ display: isRaceFinished ? 'none' : 'block' }"
    @click="toggleRace"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ButtonItem from '@/components/Atoms/ButtonItem.vue';

export default {
  name: 'StartPauseRace',
  components: { ButtonItem },
  setup() {
    const store = useStore();

    const isGenerated = computed(() => store.getters.getIsRaceGenerated);
    const isRaceStarted = computed(() => store.getters.getIsRaceStarted);
    const isRacePaused = computed(() => store.getters.getIsRacePaused);
    const isRaceFinished = computed(() => store.getters.getIsRaceFinished);

    const toggleRace = async () => {
      if (isRaceStarted.value) {
        await store.dispatch('pauseRace');
      } else {
        await store.dispatch('startRace');
      }
    };

    return {
      isGenerated,
      isRaceStarted,
      toggleRace,
      isRacePaused,
      isRaceFinished,
    };
  },
};
</script>