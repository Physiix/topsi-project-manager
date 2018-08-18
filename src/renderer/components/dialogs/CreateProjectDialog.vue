<template>
	<Dialog v-if="createProject" width="300" v-on:close="createProject = false" v-on:accept="CreateProject">
		<v-card-title>
			<v-text-field label="Title" v-model="title"></v-text-field>
		</v-card-title>
		<v-container>
			<v-text-field label="Description" v-model="description" multi-line></v-text-field>
		</v-container>
	</Dialog>
</template>
<script>

export default {
	name: 'CreateProjectDialog',
	data() {
		return {
			title: '',
			description: ''
		}
	},
	computed: {
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
		/**
		 * Handle the 'Save' button click.
		 */
		CreateProject() {
			// Create the project.
			this.$store.commit('CreateProject', {
				title: this.title,
				description: this.description
			});

			// Clean up the text fields and close dialog.
			this.title = '';
			this.description = '';
			this.createProject = false;
		}
	},
}
</script>

<style scoped>

</style>