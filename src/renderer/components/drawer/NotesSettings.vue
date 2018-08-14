<template>
	<v-list dense class="pt-0 transparent" dark>
		<v-list-tile v-for="item in items" :key="item.title" @click="item.action()">
			<v-list-tile-action>
				<v-icon>{{ item.icon }}</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>{{ item.title }}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-divider></v-divider>
		<Timelines />
	</v-list>
</template>
<script>
import Timelines from './Timelines.vue'

export default {
	name: 'NotesSettings',
	components: {
		Timelines
	},
	props: {

	},
	data() {
		return {
			items: [
				{
					icon: 'arrow_back',
					title: '',
					action: () => {
						// Save the id of the opened timeline
						this.$store.commit('SetProjectTimelineId', {
							project_id: this.$store.state.AppStore.openedProjectId,
							timeline_id: this.$store.state.AppStore.currentTimelineId
						});

						// Back to the main menu.
						this.$store.commit('OpenProject', -1);
					}
				},
				{
					icon: 'add',
					title: 'New Note',
					action: () => this.$store.commit('CreateNoteDialog')
				},
				{
					icon: 'timeline',
					title: 'New Timeline',
					action: () => this.$store.commit('CreateTimelineDialog')
				},
			]
		}
	},
	computed: {
	},
	methods: {
	},
}
</script>

<style scoped>

</style>