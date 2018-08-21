<template>
	<div>
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
		<div style="width:25px;margin-left:13px;cursor:pointer;position:absolute;bottom:0;">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" transform="rotate(180)">
				<title>DockBottom_16x</title>
				<path class="icon-vs-bg" d="M1,2V14H15V2ZM14,9H2V3H14Z" fill="#fff" />
			</svg>
		</div>

		<!-- Side -->
		<!-- <div style="width:25px;margin-left:13px;cursor:pointer;">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" transform="rotate(90 0 0)">
				<title>DockBottom_16x</title>
				<path class="icon-vs-bg" d="M1,2V14H15V2ZM14,9H2V3H14Z" />
			</svg>
		</div> -->
	</div>

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