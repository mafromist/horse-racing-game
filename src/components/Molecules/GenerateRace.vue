<template>
  <ButtonItem
    v-if="!isGenerated"
    buttonClass="button button--big"
    buttonText="Create a Race"
    @click="generateRace"
  />
  <ButtonItem
    v-else
    buttonClass="button button--big"
    buttonText="Start The Race"
    @click="startRace"
  />
  <ButtonItem
    v-if="isGenerated && isRaceStarted"
    buttonClass="button button--big"
    buttonText="Pause the Race"
    @click="pauseRace"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ButtonItem from '@/components/Atoms/ButtonItem.vue';

export default {
  name: 'GenerateRace',
  components: { ButtonItem },
  setup() {
    const store = useStore();

    const isGenerated = computed(() => store.getters.getIsRaceGenerated);
    const isRaceStarted = computed(() => store.getters.getIsRaceStarted);

    const generateRace = async () => {
      try {
        await store.dispatch('generateHorses');

        await store.dispatch('scheduleRounds');
      } catch (error) {
        console.error('Error generating the race:', error);
      }
    };

    const startRace = async () => {
      try {
        await store.dispatch('startRace');
      } catch (error) {
        console.error('Error starting the race: ', error);
      }
    };
    
    const pauseRace = async () => {
      try {
        await store.dispatch('pauseRace');
      } catch (error) {
        console.error('Error starting the race: ', error);
      }
    };

    return {
      generateRace,
      isGenerated,
      startRace,
      isRaceStarted,
      pauseRace
    };
  },
};
</script>
