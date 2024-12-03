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
    resetRace: false,
  },
  getters: {
    getHorses: (state) => state.horses,
    getRounds: (state) => state.rounds,
    getIsRaceGenerated: (state) => state.isRaceGenerated,
    getResetRace: (state) => state.resetRace,
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
    setResetRace(state) {
      state.horses = [];
      state.schedule = [];
      // state.results = [];
      // state.running = false;
      // state.finished = false;
      // state.paused = false;
      state.isRaceGenerated = false;
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

    resetRace({ commit }) {
      commit('setResetRace');
    },
  },
});
