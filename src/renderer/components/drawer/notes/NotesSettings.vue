<template>
	<v-list dense class="pt-0 transparent" dark>
		<div v-for="item in items" :key="item.title">
			<Tooltip :content="item.hint" right>
				<v-list-tile @click="item.action()">
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
				</v-list-tile>
			</Tooltip>
		</div>

		<TagsSettings />
		<v-divider></v-divider>
		<Timelines />
	</v-list>
</template>
<script>
import TagsSettings from './TagsSettings.vue'
import Timelines from './Timelines.vue'

export default {
	name: 'NotesSettings',
	components: {
		TagsSettings,
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
					hint: 'Back to projects',
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
					icon: 'search',
					title: 'Search',
					hint: 'Search in notes (CTRL + F)',
					action: () => { }
				},
				{
					icon: 'add',
					title: 'New Note',
					hint: 'Add a new Note',
					action: () => this.$store.commit('CreateNoteDialog')
				},
				{
					icon: 'timeline',
					title: 'New Timeline',
					hint: 'Add a new timeline',
					ref: 'timeline',
					action: () => { }
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