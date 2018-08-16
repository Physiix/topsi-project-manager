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

		let value = 50;
		const id = setInterval(() => {
			value += 8;
			document.getElementById('container').style.setProperty('grid-template-columns',
				+value + 'px repeat(5, 1fr)')
			// resize();
			if (value >= 250) clearInterval(id);
		})
	}
}
</script>

<style scoped>

</style>