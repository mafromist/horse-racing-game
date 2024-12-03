<template>
  <div class="horse-list-wrapper">
    <h2>Racing Horses List</h2>
    <div class="horse-list" v-if="horses.length > 0">
      <HorseItem v-for="horse in horses" :key="horse.index" :horse="horse" :showPP="true"/>
    </div>
    <p v-else>No horses available</p>
  </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';
import HorseItem from '@/components/Molecules/HorseItem.vue';

const store = useStore();

const horses = computed(() => store.getters.getHorses);
</script>