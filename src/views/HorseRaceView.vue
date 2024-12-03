<template>
  <div class="horse-race">
    <RaceControls />
    <div class="horse-race--fixtures">
      <HorseList />
      <ScheduleTabs />
      <ResultsTabs />
    </div>
    <div class="horse-race--display">
     <RaceDisplay/>
    </div>
  </div>
</template>

<script>
import RaceControls from '@/components/Organisms/RaceControls.vue';
import HorseList from '@/components/Organisms/HorseList.vue';
import ScheduleTabs from '@/components/Organisms/ScheduleTabs.vue';
import ResultsTabs from '@/components/Organisms/ResultsTabs.vue';
import RaceDisplay from '@/components/Organisms/RaceDisplay.vue';

export default {
  name: 'HorseRaceView',
  components: { HorseList, RaceControls, ScheduleTabs, RaceDisplay, ResultsTabs},
};
</script>
