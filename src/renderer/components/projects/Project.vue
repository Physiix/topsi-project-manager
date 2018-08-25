<template>
	<v-card class="ma-2 pa-3 project_card elevation-3" height="90%" @click.native="OpenProject">
		<v-card-title>
			{{project.title}}
		</v-card-title>
		<v-divider></v-divider>
		<v-card-text v-show="project.customPath">
			<strong>Path: </strong> {{project.customPath}}
		</v-card-text>
		<v-card-text v-html="project.description"></v-card-text>
	</v-card>
</template>
<script>

export default {
	name: 'Project',
	props: {
		project: Object
	},
	methods: {
		/**
		 * Set the current project Id as the opened project.
		 */
		OpenProject() {
			this.$store.commit('OpenProject', this.project.id);
			this.$store.commit('UpdateNotes', {
				projectId: this.project.id,
				milestoneId: this.project.opened_milestone_id
			});
			this.$store.commit('UpdateMilestones', {
				projectId: this.project.id
			})
		}
	},
}
</script>

<style scoped>
.project_card{
	border-radius: 0;
	cursor: pointer;
}
</style>