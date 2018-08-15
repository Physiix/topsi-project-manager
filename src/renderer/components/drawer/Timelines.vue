<template>
	<div>
		<div v-for="(timeline, index) in timelines" :key="index" @click="SetCurrentTimeline(timeline.id)">
			<!-- <v-list-tile-content> -->
			<v-btn fab small light id="timeline" class="elevation-0" :ripple="false">
				{{index}}
			</v-btn>
			<!-- <v-list-tile-title>{{timeline.title[0]}}</v-list-tile-title>
			</v-list-tile-content> -->
		</div>
	</div>
</template>
<script>

export default {
	name: 'Timelines',
	data() {
		return {
		}
	},
	computed: {
		timelines() {
			const id = this.$store.state.AppStore.openedProjectId;
			return this.$store.getters.GetTimelinesByProjectId(id);
		},

		color() {
			return this.$store.getters.appColor + ' darken-2';
		}
	},
	methods: {
		SetCurrentTimeline(id) {
			this.$store.commit('SetCurrentTimelineId', id);
			// this.$store.commit('UpdateNotes');
		}
	},
}
</script>

<style scoped>
#timeline{
/* border-radius:25%; */
	margin-left: 5px;
	opacity: 0.6;
}

#timeline:hover{
	border-radius:25%;
}
</style>