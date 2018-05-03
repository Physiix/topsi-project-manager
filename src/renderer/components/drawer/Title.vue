<template>
	<div>
		<v-toolbar flat dense color="secondary" dark id="title" @click.native="DisplayProjects">
			<v-toolbar-title class="subheading" scroll-off-screen dark>
				Project Manager
			</v-toolbar-title>
		</v-toolbar>
	</div>
</template>
<script>

export default {
	name: 'Title',
	methods: {
		DisplayProjects() {
			// Save the id of the opened timeline
			this.$store.commit('SetProjectTimelineId', {
				project_id: this.$store.state.AppStore.openedProjectId,
				timeline_id: this.$store.state.AppStore.currentTimelineId
			});

			// Back to the main menu.
			this.$store.commit('OpenProject', -1);
		}
	},
}
</script>

<style scoped>
#title{
	cursor: pointer;
}
</style>