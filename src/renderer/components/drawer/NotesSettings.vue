<template>
	<v-list dense class="pt-0 transparent" dark>
		<v-list-tile :ref="item.ref" v-for="item in items" :key="item.title" @click="item.action()">
			<v-list-tile-action>
				<v-icon>{{ item.icon }}</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>{{ item.title }}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-list-tile id="timeline-button" @click="">
			<v-list-tile-action>
				<v-icon>timeline</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>Timeline</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		<FloatingDiv div-id="timeline-button" v-on:action="" width="500" dark left>
			<v-toolbar color="secondary" dark class="px-2 elevation-0">
				<v-text-field></v-text-field>
				<v-btn flat>Add</v-btn>
			</v-toolbar>
		</FloatingDiv>
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