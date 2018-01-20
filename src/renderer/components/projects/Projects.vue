<template>
	<div>
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
		}
	},
	methods: {

	},
}
</script>

<style scoped>

</style>