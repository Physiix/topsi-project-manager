<template>
	<div :class="color" style="height:100%">
		<CreateProjectDialog v-if="createProjectDialog" />
		<ExportProjectDialog />
		<v-layout row wrap>
			<v-flex offset-xs2 xs8 v-for="(project, i) in projects" :key="i">
				<Project :project="project" />
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import CreateProjectDialog from '../dialogs/CreateProjectDialog.vue'
import ExportProjectDialog from '../dialogs/ExportProjectDialog.vue'
import Project from './Project'
import AppManager from '../../../core/ApplicationManager';

export default {
	name: 'Projects',
	components: {
		CreateProjectDialog,
		ExportProjectDialog,
		Project
	},
	computed: {
		projects() {
			return this.$store.state.ProjectsStore.projects;
		},
		color() {
			if (this.$store.getters.isDarkMode)
				return '';
			else return 'grey lighten-2'
		},

		createProjectDialog() {
			return this.$store.state.AppStore.dialogs.createProject;
		},
	},
	mounted() {
		// Update the projects list.
		this.$store.dispatch('RetrieveProjects');
		AppManager.SetupProjectsPage('container');
	}
}
</script>

<style scoped>

</style>