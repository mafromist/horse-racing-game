<template>
  <ButtonItem
    v-if="!isGenerated"
    buttonClass="button button--big"
    buttonText="Create a Race"
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
        return console.error('Error ', error);
      }
    };

    return {
      generateRace,
      isGenerated,
    };
  },
};
</script>
