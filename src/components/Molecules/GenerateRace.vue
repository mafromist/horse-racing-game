<template>
  <ButtonItem
    buttonClass="button--big"
    :buttonText="isGenerated ? 'Start The Race' : 'Create a Race'"
    @click="generateRace"
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

    const generateRace = async () => {
      try {
        await store.dispatch('generateHorses');

        await store.dispatch('scheduleRounds');
      } catch (error) {
        console.error('Error generating the race:', error);
      }
    };

    return {
      generateRace,
      isGenerated,
    };
  },
};
</script>
