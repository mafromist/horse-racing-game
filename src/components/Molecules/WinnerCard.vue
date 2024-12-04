<template>
  <div class="winner-card">
    <IconHorse :color="iconColor" />
    <div class="winner-details">
      <h3>Horse {{ horseId }}</h3>
      <TextItem tag="p" customClass="points">{{ totalPoints }} Points</TextItem>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import IconHorse from '@/components/Atoms/IconHorse.vue';
import TextItem from '@/components/Atoms/TextItem.vue';

defineProps({
  horseId: {
    type: String,
    required: true,
  },
  totalPoints: {
    type: Number,
    required: true,
  },
  iconColor: {
    type: String,
    required: true,
  },
});
</script>