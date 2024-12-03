import { createStore } from 'vuex';

// Helper functions for generating random horses
const generateRandomHEXColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
const generatePerformancePoint = () => Math.floor(Math.random() * 91) + 10;

export default createStore({
  state: {
    horses: [],
    rounds: [],
    schedule: [],
    isRaceGenerated: false,
    isRaceReseted: false,
    isRaceStarted: false,
    isRaceFinished: false,
    isRacePaused: false,
  },
  getters: {
    getHorses: (state) => state.horses,
    getRounds: (state) => state.rounds,
    getRaceSchedule: (state) => state.schedule,
    getIsRaceGenerated: (state) => state.isRaceGenerated,
    getResetRace: (state) => state.isRaceReseted,
    getIsRaceStarted: (state) => state.isRaceStarted,
    getIsRacePaused: (state) => state.isRacePaused,
  },
  mutations: {
    setHorses(state, horses) {
      state.horses = horses;
    },
    setRaceSchedule(state, rounds) {
      state.rounds = rounds;
    },
    setIsGeneratedRace(state, value) {
      state.isRaceGenerated = value;
    },
    setIsRaceStarted(state, value) {
      state.isRaceStarted = value;
    },
    setIsRacePaused(state, value) {
      state.isRacePaused = value;
    },
    setResetRace(state) {
      state.horses = [];
      state.schedule = [];
      state.rounds = [];
      state.isRaceGenerated = false;
      state.isRaceStarted = false;
    },
  },
  actions: {
    async generateHorses({ commit }) {
      const horses = [];
      for (let i = 1; i <= 20; i++) {
        horses.push({
          id: i,
          number: i,
          color: generateRandomHEXColor(),
          performancePoint: generatePerformancePoint(),
        });
      }
      commit('setHorses', horses);
      commit('setIsGeneratedRace', true);
    },

    async scheduleRounds({ commit, state }) {
      const rounds = [];
      const distances = [1200, 1400, 1600, 1800, 2000, 2200];
      for (let i = 0; i < 6; i++) {
        const selectedHorses = state.horses
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
        rounds.push({
          roundId: i + 1,
          distance: distances[i],
          horses: selectedHorses,
        });
      }
      commit('setRaceSchedule', rounds);
    },

    startRace({ commit }) {
      if (!this.state.isRaceGenerated) return;
      if (!this.state.isRaceStarted) {
        commit('setIsRaceStarted', true);
        commit('setIsRacePaused', false);
      } else if (!this.state.paused) {
        commit('setIsRacePaused', true);
      } else {
        commit('setIsRacePaused', false);
      }
    },
    resetRace({ commit }) {
      commit('setResetRace');
    },

    RaceResultsWithTiming({ state }) {
      const rounds = state.rounds;
      for (let i = 0; i < rounds.length; i++) {
        const round = rounds[i];
        const distance = round.distance;
        const horses = round.horses;
        const results = [];
        for (let j = 0; j < horses.length; j++) {
          const horse = horses[j];
          const performance = horse.performancePoint;
          const time = Math.floor((distance / performance) * 60);
          results.push({
            horse: horse,
            time: time,
          });
        }
        results.sort((a, b) => a.time - b.time);
      }
    },
  },
});
