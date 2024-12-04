<template>
  <div class="winner-container">
    <h2 class="winner-title">Race Winner</h2>
    <div v-if="topThreeScores.length > 0" class="winner-card">
      <div class="winner-details">
        <div class="winner-icon">
          <IconHorse :color="topThreeScores[0].horseId % 2 === 0 ? 'gold' : 'silver'" />
        </div>
        <div class="winner-info">
          <h3>Horse {{ topThreeScores[0].horseId }}</h3>
          <p class="points">{{ topThreeScores[0].totalPoints }} Points</p>
        </div>
      </div>
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
import IconHorse from '@/components/Atoms/IconHorse.vue';

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

<style scoped>
.winner-container {
  text-align: center;
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

.winner-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
}

.winner-card {
  display: inline-block;
  width: 300px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
}

.winner-details {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.winner-icon {
  width: 60px;
  height: 60px;
  background-color: #ffd700;
  border-radius: 50%;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.winner-info h3 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #555;
  margin: 0;
}

.winner-info .points {
  font-size: 1.2rem;
  color: #888;
}

.winner-description {
  font-size: 1rem;
  color: #444;
  margin-top: 10px;
}

.winner-description p {
  font-weight: 500;
  color: #333;
}

.winner-container p {
  font-size: 1rem;
  color: #888;
  margin-top: 10px;
}
</style>
