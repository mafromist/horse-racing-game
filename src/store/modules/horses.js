import {createStore} from 'vuex';

const generateRandomHEXColor = () => {
	return `#${Math.floor(Math.random() * 16777215)
		.toString(16)
		.padStart(6, '0')}`;
};

const generatePerformancePoint = () => {
	return Math.floor(Math.random() * 91) + 10
}

export default createStore({
	state: {
		horses: [],
	},
	getters: {
		getHorses: (state) => state.horses,
	},
	mutations: {
		setHorses(state, horses) {
			state.horses = horses;
		},
	},
	actions: {
		generateHorses({commit}) {
			const horses = [];
			for (let i = 1; i <= 20; i++) {
				horses.push({
					number: i,
					color: generateRandomHEXColor(),
					performancePoint: generatePerformancePoint()
				});
			}
			commit('setHorses', horses);
		},
	},
	modules: {},
});
