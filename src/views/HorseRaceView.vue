<template>
  <div class="horse-race">
    <RaceControls />
    <div class="horse-race--fixtures">
      <HorseList />
      <FullTabView />
      <FullTabView />
    </div>
    <div class="horse-race--display">
     <h1>Animation Here</h1>
     <RaceDisplay/>
    </div>
  </div>
</template>

<script>
import RaceControls from '@/components/Organisms/RaceControls.vue';
import HorseList from '@/components/Organisms/HorseList.vue';
import FullTabView from '@/components/Organisms/FullTabView.vue';
import RaceDisplay from '@/components/Organisms/RaceDisplay.vue';

export default {
  name: 'HorseRaceView',
  components: { HorseList, RaceControls, FullTabView, RaceDisplay},
};
</script>
