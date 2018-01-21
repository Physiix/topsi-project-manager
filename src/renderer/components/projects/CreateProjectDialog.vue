<template>
	<div>
		<v-dialog v-model="createProject" max-width="300">
			<v-card>
				<v-card-title>New Project</v-card-title>
				<v-container>
					<v-text-field label="Title" v-model="title"></v-text-field>
					<v-text-field label="Description" v-model="description" multi-line></v-text-field>
				</v-container>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn flat class="ma-0" @click="createProject = false">Cancel</v-btn>
					<v-btn flat class="ma-0" @click="CreateProject">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
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