<template>
  <div v-if="currentRound?.horses.length > 0 && !isRaceFinished" class="race">
    <div class="race-header">
      <h2 class="race-title">
        Current Race | {{ currentRound.distance }}M | Round:
        {{ currentRoundIndex + 1 }} / 6
      </h2>
    </div>
    <div class="race-track">

      <div class="start-line">
        <div
          v-for="horse in currentRound?.horses || []"
          :key="horse.id"
          class="horse-id"
        >
          Horse {{ horse.id }}
        </div>
      </div>
      <div class="race-line">
        <div
          v-for="horse in currentRound?.horses || []"
          :key="horse.id"
          class="horse"
        >
          <IconHorse :id="`racing-${horse.id}`" :color="horse.color" />
        </div>
      </div>
      <div class="finish-line">Finish</div>
    </div>
  </div>
  <div v-if="isRaceFinished" class="score-table">
    <!-- <ScoreTable /> -->
    <Winners/>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import anime from 'animejs';
import IconHorse from '@/components/Atoms/IconHorse.vue';
// import ScoreTable from '@/components/Organisms/ScoreTable.vue';
import Winners from '@/components/Organisms/Winners.vue';

export default defineComponent({
  name: 'RaceAnimation',
  components: {
    IconHorse,
    // ScoreTable,
    Winners
  },
  setup() {
    const store = useStore();
    const isRaceFinished = computed(() => store.getters.getIsRaceFinished);
    const currentRoundIndex = ref(0);
    const currentRound = computed(
      () => store.getters.getRounds[currentRoundIndex.value],
    );

    const isAnimating = ref(false);

    const startRace = () => {
      if (isAnimating.value) return;

      isAnimating.value = true;
      const round = currentRound.value;
      if (round) {
        animateRun(round.horses, round.distance).then((finishTimes) => {
          const resultHorses = round.horses.map((horse, index) => ({
            ...horse,
            finishTime: finishTimes[index],
          }));

          store.dispatch('setRaceResultFinishTimes', {
            roundIndex: currentRoundIndex.value,
            resultHorses,
          });

          currentRoundIndex.value++;

          if (currentRoundIndex.value < 6) {
            setTimeout(() => {
              resetHorsesPosition();
              startRace();
            }, 500);
          } else {
            store.commit('setRaceFinished', true);
          }

          isAnimating.value = false;
        });
      }
    };

    const resetHorsesPosition = () => {
      const horses = document.querySelectorAll('[id^="racing-"]');
      horses.forEach((horse) => {
        horse.style.transform = `translateX(0)`;
      });
    };

    const getEndPosition = () => {
      const raceTrack = document.querySelector('.race-track');
      const finishLine = document.querySelector('.finish-line');
      const startLine = document.querySelector('.start-line');

      if (raceTrack && finishLine && startLine) {
        const raceTrackRect = raceTrack.getBoundingClientRect();
        const finishLineRect = finishLine.getBoundingClientRect();
        const startLineRect = startLine.getBoundingClientRect();
        const endPosition = finishLineRect.left - raceTrackRect.left;
        const startLineEnd = startLineRect.right - raceTrackRect.left;

        return endPosition - startLineEnd;
      }
      return 0;
    };

    const animateRun = (horses, distance) => {
      return new Promise((resolve) => {
        const finishTimes = [];
        const endPosition = getEndPosition();

        console.log(horses.map((horse) => horse.id));

        horses.forEach((horse, index) => {
          const duration = (distance / (50 + Math.random() * 50)).toFixed(2);
          finishTimes.push(duration);

          anime({
            targets: `#racing-${horse.id}`,
            translateX: endPosition + 'px',
            duration: duration * 100,
            easing: 'linear',
            complete: () => {
              if (index === horses.length - 1) resolve(finishTimes);
            },
          });
        });
      });
    };

    const pauseRace = () => {
      isAnimating.value = false;
      store.commit('setIsRacePaused', true);
      resetHorsesPosition();
    };

    watch(
      () => store.state.isRaceStarted,
      (newValue) => {
        if (newValue) {
          startRace();
        } else {
          pauseRace();
        }
      },
    );

    return { currentRound, currentRoundIndex, isRaceFinished };
  },
});
</script>
