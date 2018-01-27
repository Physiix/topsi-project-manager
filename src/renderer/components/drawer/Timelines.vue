<template>
	<div>
		<v-list-tile v-for="(timeline, index) in timelines" :key="index" @click="SetCurrentTimeline(timeline.id)">
			<v-list-tile-content>
				<v-list-tile-title>{{timeline.title}} {{timeline.id}}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</div>
</template>
<script>

export default {
	name: 'Timelines',
	components: {

	},
	props: {

	},
	data() {
		return {
		}
	},
	computed: {
		timelines() {
			const id = this.$store.state.AppStore.openedProjectId;
			return this.$store.getters.GetTimelinesByProjectId(id);
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

</style>