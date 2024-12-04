<template>
  <div v-if="currentRound?.horses.length > 0 && !isRaceFinished" class="race">
    <div class="race--header">
      <h2 class="race--title">
        Current Race | {{ currentRound.distance }}M | Round:
        {{ currentRoundIndex + 1 }} / 6
      </h2>
    </div>
    <div class="race--track">
      <div class="race--start-line">
        <div
          v-for="horse in currentRound?.horses || []"
          :key="horse.id"
          class="horse-id"
        >
          Horse {{ horse.id }}
        </div>
      </div>
      <div class="race--line">
        <div
          v-for="horse in currentRound?.horses || []"
          :key="horse.id"
          class="horse"
        >
          <IconHorse :id="`racing-${horse.id}`" :color="horse.color" />
        </div>
      </div>
      <div class="race--finish-line">FINISH HERE</div>
    </div>
  </div>
  <div v-if="isRaceFinished" class="race--score-table">
    <Winners />
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import anime from 'animejs';
import IconHorse from '@/components/Atoms/IconHorse.vue';
import Winners from '@/components/Organisms/Winners.vue';

export default defineComponent({
  name: 'RaceAnimation',
  components: {
    IconHorse,
    Winners,
  },
  setup() {
    const store = useStore();
    const isRaceFinished = computed(() => store.getters.getIsRaceFinished);
    const currentRoundIndex = ref(0);
    const currentRound = computed(
      () => store.getters.getRounds[currentRoundIndex.value],
    );

    const isAnimationStarted = ref(false);

    const startRace = () => {
      if (isAnimationStarted.value) return;

      isAnimationStarted.value = true;

      const round = currentRound.value;

      if (round) {
        const endPosition = getEndPosition();
        const horsePositions = store.getters.getHorsePositions || {};

        const remainingDistances = round.horses.map((horse) => {
          const currentX = horsePositions[`racing-${horse.id}`] || 0;
          return Math.max(endPosition - currentX, 0); // Prevent negative values
        });

        startRound(round.horses, remainingDistances).then((finishTimes) => {
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

          isAnimationStarted.value = false;
        });
      }
    };

    const resetHorsesPosition = () => {
      store.commit('setHorsePositions', {});
      const horses = document.querySelectorAll('[id^="racing-"]');
      horses.forEach((horse) => {
        horse.style.transform = `translateX(0)`;
      });
    };

    const getEndPosition = () => {
      const raceTrack = document.querySelector('.race--track');
      const finishLine = document.querySelector('.race--finish-line');
      const startLine = document.querySelector('.race--start-line');

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

    const startRound = (horses, remainingDistances) => {
      return new Promise((resolve) => {
        const finishTimes = [];
        remainingDistances.forEach((distance, index) => {
          const duration = (distance / (50 + Math.random() * 50)).toFixed(2);
          finishTimes.push(duration);

          anime({
            targets: `#racing-${horses[index].id}`,
            translateX: `+=${distance}px`, // Add only the remaining distance
            duration: duration * 100,
            easing: 'linear',
            complete: () => {
              if (index === remainingDistances.length - 1) resolve(finishTimes);
            },
          });
        });
      });
    };

    const pauseRace = () => {
      isAnimationStarted.value = false;
      saveHorsePositions();
      anime.remove('[id^="racing-"]');
      store.commit('setIsRaceStarted', false);
      store.commit('setIsRacePaused', true);
    };

    const saveHorsePositions = () => {
      const horses = document.querySelectorAll('[id^="racing-"]');
      const positions = {};
      horses.forEach((horse) => {
        const transform = horse.style.transform || '';
        const match = transform.match(/translateX\((\d+(?:\.\d+)?)px\)/);
        positions[horse.id] = match ? parseFloat(match[1]) : 0;
      });
      store.commit('setHorsePositions', positions);
    };

    const resumeHorsePositions = () => {
      const horses = document.querySelectorAll('[id^="racing-"]');
      const horsePositions = store.getters.getHorsePositions || {};
      horses.forEach((horse) => {
        const savedPosition = horsePositions[horse.id] || 0;
        horse.style.transform = `translateX(${savedPosition}px)`;
      });
    };

    watch(
      () => [store.state.isRaceStarted, store.state.isRacePaused],
      ([isStarted, isPaused]) => {
        if (isStarted && !isPaused) {
          resumeHorsePositions();
          startRace();
        } else if (isPaused) {
          pauseRace();
        }
      },
    );

    return { currentRound, currentRoundIndex, isRaceFinished };
  },
});
</script>
