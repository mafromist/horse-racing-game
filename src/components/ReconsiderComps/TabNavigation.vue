<template>
  <div>
    {{ navContent }}
    <div
      class="tab"
      v-for="content in navContent"
      :key="content.roundId"
      :class="{ active: selectedTab === content.roundId }"
      @click="selectTab(content.roundId)"
    >
      Round {{ content.roundId }} - {{ content.distance }} <p>M</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
defineProps({
  navContent: Object,
  selectTab: Function,
});

const selectedTab = ref(0);


</script>
