<template>
  <div class="winner-container">
    <TextItem title="Race Winner" />
    <div v-if="topThreeScores.length > 0" class="winner-card">
      <WinnerCard
        :horseId="topThreeScores[0].horseId"
        :totalPoints="topThreeScores[0].totalPoints"
        iconColor="gold"
      />
      <div class="winner-description">
        <p>Congratulations to the winner! This horse scored the highest points across all rounds.</p>
      </div>
    </div>
    <div v-else>
      <p>No winner yet!</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import TextItem from '@/components/Atoms/TextItem.vue';
import WinnerCard from '@/components/Molecules/WinnerCard.vue';

const store = useStore();

// Get total scores for each horse from Vuex store
const totalScores = computed(() => store.state.totalScores);

// Get the top scorer (winner)
const topThreeScores = computed(() => {
  const sortedScores = Object.keys(totalScores.value)
    .map(horseId => ({
      horseId,
      totalPoints: totalScores.value[horseId]
    }))
    .sort((a, b) => b.totalPoints - a.totalPoints);

  return sortedScores.slice(0, 3); // Return the top 3
});
</script>