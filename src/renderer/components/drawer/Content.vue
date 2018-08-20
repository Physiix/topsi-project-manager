<template>
	<div>
		<Settings />
		<ProjectSettings v-if="displayProjects" />
		<NotesSettings v-else/>
	</div>
</template>
<script>
import NotesSettings from './notes/NotesSettings.vue'
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