<template>
  <div class="horse-race">
    <RaceControls />
    <HorseList />
    <!-- <ScheduleTabs/> -->
    <FullTabView />
  </div>
</template>

<script>
import RaceControls from '@/components/Organisms/RaceControls.vue';
import HorseList from '@/components/Organisms/HorseList.vue';
// import ScheduleTabs from '@/components/Organisms/ScheduleTabs.vue';
import FullTabView from '@/components/Organisms/FullTabView.vue';

export default {
  name: 'HorseRaceView',
  components: { HorseList, RaceControls, FullTabView },
};
</script>
