<template>
  <div class="racing-horses">
    <h2>Horse Racing Rounds</h2>
    <!-- Tabs Navigation -->
    <div v-if="horses && horses.length > 0" class="tabs">
      <div
        class="tab"
        v-for="(round, index) in rounds"
        :key="round.index"
        :class="{ active: selectedTab === index }"
        @click="selectTab(index)"
      >
        Round {{ index + 1 }} - {{ round.distance }} M
      </div>
    </div>

    <!-- Tab Content -->
    <div v-if="selectedTab !== null && rounds[selectedTab]" class="tab-content">
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Horse Number</th>
            <th>Color</th>
            <th>Performance Point</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(horse, index) in rounds[selectedTab].horses"
            :key="horse.id"
          >
            <td>{{ index + 1 }}</td>
            <!-- Position starts from 1 -->
            <td>Horse {{ horse.number }}</td>
            <td :style="{ backgroundColor: horse.color }">{{ horse.color }}</td>
            <td>{{ horse.performancePoint }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ScheduleTabs',

  setup() {
    const store = useStore();
    const rounds = computed(() => store.getters.getRounds);
    const horses = computed(() => store.getters.getHorses);
    const selectedTab = ref(0);

    const selectTab = (index) => {
      selectedTab.value = index;
    };

    onMounted(() => {
      if (!horses.value || horses.value.length !== 0) {
        return;
      } else {
        store.dispatch('scheduleRounds');
      }
    });

    return {
      rounds,
      horses,
      selectedTab,
      selectTab,
    };
  },
};
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 10px;
}

.tab {
  cursor: pointer;
  padding: 10px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  transition: background-color 0.3s;
}

.tab.active {
  background-color: #007bff;
  color: white;
}

.tab-content {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: left;
  border: 1px solid #ddd;
}

th {
  background-color: #f9f9f9;
}
</style>
