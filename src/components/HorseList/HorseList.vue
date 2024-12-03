<template>
	<div class="horse-list-wrapper">
		<h2>Racing Horses List</h2>
		<div
			class="horse-list"
			v-if="horses.length > 0">
			<HorseItem
				v-for="horse in horses"
				:key="horse.index"
				:horse="horse" />
		</div>
		<p v-else>No horses available</p>
	</div>
</template>

<script>
	import {useStore} from 'vuex';
	import {computed} from 'vue';
	import HorseItem from './HorseItem.vue';

	export default {
		name: 'HorseList',
		components: {HorseItem},
		setup() {
			const store = useStore();
			const horses = computed(() => store.getters.getHorses);
			const generateHorses = () => {
				store.dispatch('generateHorses').catch((error) => {
					console.error('Error generating horses:', error);
				});
			};
			return {
				horses,
				generateHorses,
			};
		},
	};
</script>
