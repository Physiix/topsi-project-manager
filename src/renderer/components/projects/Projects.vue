<template>
	<div :class="color" style="height:100%">
		<CreateProjectDialog />
		<v-layout row wrap>
			<v-flex xs3 v-for="(project, i) in projects" :key="i">
				<Project :project="project" />
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import CreateProjectDialog from '../dialogs/CreateProjectDialog.vue'
import Project from './Project'
import { AppManager } from '../../../core/ApplicationManager';

export default {
	name: 'Projects',
	components: {
		CreateProjectDialog,
		Project
	},
	computed: {
		projects() {
			return this.$store.state.ProjectsStore.projects;
		},
		color() {
			if (this.$store.getters.IsDarkMode)
				return '';
			else return 'grey lighten-2'
		}
	},
	mounted() {
		// Update the projects list.
		this.$store.commit('UpdateProjects');
		AppManager.SetupProjectsPage('container');
	}
}
</script>

<style scoped>

</style>