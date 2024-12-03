<template>
  <ButtonItem
    v-if="isGenerated"
    buttonClass="button button--big"
    :buttonText="isRaceStarted ? 'Pause The Race' : 'Start The Race'"
    @click="startRace"
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
    const setIsRacePaused = computed(() => store.getters.getIsRacePaused);

    const startRace = async () => {
      if (isRaceStarted.value) {
        await store.dispatch('pauseRace');
      } else {
        await store.dispatch('startRace');
      }
    };

    const pauseRace = async () => {
      try {
        await store.dispatch('pauseRace');
      } catch (error) {
        return console.error('Error ', error);
      }
    };

    return {
      isGenerated,
      isRaceStarted,
      startRace,
      pauseRace,
      setIsRacePaused,
    };
  },
};
</script>
