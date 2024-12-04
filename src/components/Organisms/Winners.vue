<template>
  <div class="winner--container">
    <TextItem tag="h2">Race Winner</TextItem>
    <div v-if="topThreeScores.length > 0" class="winner--cards">
      <WinnerCard
        v-for="score in topThreeScores"
        :key="score.horseId"
        :horseId="score.horseId"
        :totalPoints="score.totalPoints"
        :iconColor="score.iconColor"
      />
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

const totalScores = computed(() => store.state.totalScores);

const topThreeScores = computed(() => {
  const iconColors = ['#ffd700', '#c0c0c0', '#6f3535'];

  const sortedScores = Object.entries(totalScores.value)
    .sort(([, aPoints], [, bPoints]) => bPoints - aPoints)
    .map(([horseId, totalPoints], index) => ({
      horseId,
      totalPoints,
      iconColor: iconColors[index] || null,
    }));

  return sortedScores.slice(0, 3);
});
</script>
