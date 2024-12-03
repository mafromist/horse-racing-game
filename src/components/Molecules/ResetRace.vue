<template>
  <ButtonItem
    v-if="isGenerated"
    buttonClass="button--big"
    buttonText="Reset Race"
    @click="resetRace"
  />
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
import ButtonItem from '@/components/Atoms/ButtonItem.vue';

export default {
  name: 'ResetRace',
  components: { ButtonItem },
  setup() {
    const store = useStore();
    const isGenerated = computed(() => store.getters.getIsRaceGenerated);

    const resetRace = async () => {
      try {
        await store.dispatch('resetRace');
      } catch (error) {
        return console.error('Error ', error);
      }
    };

    return {
      resetRace,
      isGenerated,
    };
  },
};
</script>
