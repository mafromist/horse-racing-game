<template>
	<div class="horse-race">
		<GenerateRace />
		<HorseList />
	</div>
</template>

<script>
	import GenerateRace from '@/components/Controls/GenerateRace.vue';
	import HorseList from '@/components/HorseList/HorseList.vue';

	export default {
		name: 'HorseRaceView',
		components: {HorseList, GenerateRace},
	};
</script>
