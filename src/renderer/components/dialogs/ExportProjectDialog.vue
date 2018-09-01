<template>
	<Dialog v-if="exportProject" width="300" v-on:close="exportProject = false" v-on:accept="ExportProject" :accept-text="this.$lang.Get('export')">
		<v-container>
			<v-radio-group v-model="project" column color="primary">
				<v-radio v-for="(project, i) in projects" :key="project.title + i" :label="project.title" :value="project" color="primary"></v-radio>
			</v-radio-group>
		</v-container>
	</Dialog>
</template>
<script>
import ProjectManager from '../../../core/ProjectManager'

export default {
	name: 'ExportProjectDialog',
	data() {
		return {
			// Selected project.
			project: null,
		}
	},
	computed: {
		exportProject: {
			set(value) {
				this.$store.dispatch('ToggleDialog', 'exportProject');
			},
			get() {
				return this.$store.state.AppStore.dialogs.exportProject;
			}
		},

		projects() {
			return this.$store.getters.projects;
		}
	},
	methods: {
		/**
		 * Handle the 'Save' button click.
		 */
		ExportProject() {
			// Close the dialog.
			this.exportProject = false;

			// Make sure a project is selected.
			if (this.project == null) return;

			// Save the project.
			ProjectManager.SaveProject(this.project);
		}
	},
}
</script>

<style scoped>

</style>