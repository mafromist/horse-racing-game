<template>
  <div class="race-animation">
    <h2 class="race-title">Race</h2>
    <div v-if="currentRound" class="race-info">
      <h3 class="distance">{{ currentRound.distance }}m</h3>
      <p class="round">Round: {{ currentRoundIndex + 1 }} / 6</p>
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
          <IconHorse id="racing" class="horse-icon" :color="horse.color" />
        </div>
      </div>
      <div class="finish-line">Finish</div>
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, ref, watch } from 'vue';
import { useStore } from 'vuex';
import anime from 'animejs';
import IconHorse from '@/components/Atoms/IconHorse.vue';

export default defineComponent({
  name: 'RaceAnimation',
  components: {
    IconHorse,
  },
  setup() {
    const store = useStore();
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

          store.commit('setRaceResultFinishTimes', {
            roundIndex: currentRoundIndex.value,
            resultHorses,
          });

          currentRoundIndex.value += 1;

          if (currentRoundIndex.value < 6) {
            setTimeout(() => {
              resetHorsesPosition();
              startRace();
            }, 5000);
          } else {
            store.commit('setRaceFinished', true);
          }

          isAnimating.value = false;
        });
      }
    };

    const resetHorsesPosition = () => {
      const horses = document.querySelectorAll('.horse');
      horses.forEach((horse) => {
        horse.style.transform = 'translateX(0)';
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

        horses.forEach((horse, index) => {
          const duration = (distance / (50 + Math.random() * 50)).toFixed(2);
          finishTimes.push(duration);

          anime({
            targets: `#racing .horse:nth-child(${index + 1})`,
            translateX: endPosition + 'px',
            duration: duration * 1000,
            easing: 'linear',
            complete: index === horses.length - 1 && resolve(finishTimes),
          });
        });
      });
    };

    const stopRace = () => {
      isAnimating.value = false;
      resetHorsesPosition();
    };

    watch(
      () => store.state.isRaceStarted,
      (newValue) => {
        if (newValue) {
          startRace();
        } else {
          stopRace();
        }
      },
    );

    return { currentRound, currentRoundIndex };
  },
});
</script>

<style scoped>
.race-animation {
  margin-top: 20px;
  font-family: Arial, sans-serif;
}

.race-title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 10px;
  background-color: #333;
  color: white;
  padding: 10px;
  border-radius: 5px;
}

.race-info {
  margin-bottom: 10px;
}

.distance,
.round {
  font-size: 1.2rem;
  font-weight: bold;
}

.race-track {
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  gap: 10px;
  border: 2px solid #000;
  border-radius: 5px;
  padding: 10px;
  width: 100%;
  position: relative;
}

.start-line,
.finish-line {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.start-line {
  font-size: 0.9rem;
}

.finish-line {
  height: 100%;
  writing-mode: vertical-rl;
  font-weight: bold;
}

.race-line {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.horse {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  position: relative;
}

.horse-icon {
  width: 30px;
  height: auto;
}
</style>
