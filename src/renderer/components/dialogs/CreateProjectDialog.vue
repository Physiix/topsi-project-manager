<template>
	<ProjectDialogContent :project="project" v-on:close="createProject = false" v-on:accept="CreateProject" />
</template>
<script>
import ProjectDialogContent from './ProjectDialogContent.vue'

let editor = null;

export default {
	name: 'CreateProjectDialog',
	components: {
		ProjectDialogContent
	},
	computed: {
		createProject: {
			set(value) {
				this.$store.commit('CreateProjDialog');
			},
			get() {
				return this.$store.state.AppStore.dialogs.createProject;
			}
		},

		project() {
			return {
				title: '',
				category: '',
				categories: [
					'TODO', 'In Progress', 'Done'
				]
			}
		}
	},
	methods: {
		/**
		 * Handle the 'Save' button click.
		 */
		CreateProject(data) {
			console.log(data)

			// Create the project.
			this.$store.commit('CreateProject', {
				title: data.title,
				description: data.description,
				categories: data.categories
			});
			this.createProject = false;
		},
	},
}
</script>

<style scoped>

</style>