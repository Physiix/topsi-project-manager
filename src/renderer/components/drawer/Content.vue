<template>
	<div>
		<Settings />
		<v-list dense class="pt-0">
			<ProjectSettings v-if="displayProjects" />
			<NotesSettings v-else/>
		</v-list>
	</div>
</template>
<script>
import NotesSettings from './NotesSettings.vue'
import ProjectSettings from './ProjectSettings.vue'
import Settings from './Settings.vue'

export default {
	name: 'Content',
	components: {
		ProjectSettings,
		NotesSettings,
		Settings
	},
	props: {

	},
	data() {
		return {
			items: [
				{
					icon: 'add',
					title: 'New Note',
					action: () => this.$store.commit('CreateNoteDialog')
				},
				{
					icon: 'edit',
					title: 'Edit Mode'
				}
			]
		}
	},
	computed: {
		displayProjects() {
			return this.$store.state.AppStore.openedProjectId == -1;
		}
	}
}
</script>

<style scoped>

</style>