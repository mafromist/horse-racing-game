<template>

  <div class="racing-horses">
    <h2>Horse Racing Rounds</h2>

    <!-- <Tabs title="Race Schedule" :tabsContent="rounds"/> -->

  </div>
</template>

<script>
// import Tabs from '@/components/Molecules/Tabs.vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ScheduleTabs',
  // components: { Tabs },

  setup() {
    const store = useStore();
    const rounds = computed(() => store.getters.getRounds);


    onMounted(() => {

        store.dispatch('scheduleRounds');
      }
    );

    return {
      rounds,
    
    };
  },
};
</script>