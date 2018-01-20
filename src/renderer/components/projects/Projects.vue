<template>
	<div>
		<v-dialog v-model="createProject" max-width="300">
			<v-card>
				<v-card-title>New Project</v-card-title>
				<v-content>
					<v-card-text>
						test
					</v-card-text>
				</v-content>
			</v-card>
		</v-dialog>
		<v-layout row wrap>
			<v-flex xs3 v-for="(project, i) in projects" :key="i">
				<Project :project="project" />
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import Project from './Project'

export default {
	name: 'Projects',
	components: {
		Project
	},
	computed: {
		projects() {
			return this.$store.state.ProjectsStore.projects;
		},
		createProject: {
			set(value) {
				this.$store.commit('CreateProjDialog');
			},

			get() {
				return this.$store.state.AppStore.dialogs.createProject;
			}
		}
	},
	methods: {

	},
}
</script>

<style scoped>

</style>