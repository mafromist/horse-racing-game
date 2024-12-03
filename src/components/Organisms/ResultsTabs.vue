<template>
  <div class="tabs race-schedule">
    <h2 class="tabs--title">Horse Racing Results</h2>
    <div v-if="!results.length">No Race Results Available</div>
    <div v-else class="tab">
      <div v-if="horses && horses.length > 0" class="tab--nav">
        <div
          class="tab--nav-item"
          v-for="(result, index) in results"
          :key="result.index"
          :class="{ active: selectedTab === index }"
          @click="selectTab(index)"
        >
          <p class="tab--nav-item-title">Round {{ index + 1 }}</p>
          <p class="tab--nav-item-title">{{ result.distance }}M</p>
        </div>
      </div>

      <div
        v-if="selectedTab !== null && results[selectedTab]"
        class="tab--content"
      >
        <table class="tab--content-table">
          <thead class="tab--content-table-head">
            <tr class="tab--content-table-head-row">
              <th class="tab--content-table-head-text">Position</th>
              <th class="tab--content-table-head-text">Horse Number</th>
              <th class="tab--content-table-head-text">Performance Point</th>
              <th class="tab--content-table-head-text">Finish Time (s)</th>
            </tr>
          </thead>
          <tbody class="tab--content-table-body">
            
            <tr
              v-for="(horse, index) in results[selectedTab].horses"
              :key="horse.id"
              class="tab--content-table-body-row"
            >
              <td class="tab--content-table-body-text">{{ index + 1 }}</td>
              <td class="tab--content-table-body-text horse-item">
                <HorseItem :horse="horse" :showPP="false" />
              </td>

              <td class="tab--content-table-body-text">
                {{ horse.performancePoint }}
              </td>
              <td class="tab--content-table-body-text">
                {{ horse.finishTime }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import HorseItem from '@/components/Molecules/HorseItem.vue';

export default {
  name: 'ResultsTabs',
  components: { HorseItem },

  setup() {
    const store = useStore();
    const results = computed(() => store.getters.getRaceResults);
    const horses = computed(() => store.getters.getHorses);
    const selectedTab = ref(0);

    const selectTab = (index) => {
      selectedTab.value = index;
    };

    onMounted(() => {
      if (!horses.value || horses.value.length !== 0) {
        return;
      } else {
        store.dispatch('setRaceResultFinishTimes');
      }
    });

    return {
      results,
      horses,
      selectedTab,
      selectTab,
    };
  },
};
</script>
