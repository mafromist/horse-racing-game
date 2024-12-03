<template>
	<button @click="generateHorses">Generate Horses</button>
</template>

<script>
	import {useStore} from 'vuex';
	export default {
		name: 'GenerateRace',
		setup() {
			const store = useStore();
			const generateHorses = () => {
				store.dispatch('generateHorses').catch((error) => {
					console.error('Error generating horses:', error);
				});
			};
			return {
				generateHorses,
			};
		},
	};
</script>
