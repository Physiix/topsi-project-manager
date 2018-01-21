<template>
	<v-container>
		{{project.title}}
	</v-container>
</template>
<script>

export default {
	name: 'Notes',
	components: {

	},
	props: {

	},
	data() {
		return {

		}
	},
	computed: {
		project() {
			const id = this.$store.state.AppStore.openedProjectId;
			const project = this.$store.getters.GetProjectById(id);
			console.log(project);
			return project;
		}
	},
	methods: {

	},
}
</script>

<style scoped>

</style>