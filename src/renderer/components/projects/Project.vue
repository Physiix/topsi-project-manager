<template>
	<div>
		<v-card class="ma-2 project_card elevation-3" height="100%" @click.native="OpenProject">
			<v-card-title>
				{{project.title}}
			</v-card-title>
			<v-card-text>
				{{project.description}}
			</v-card-text>
		</v-card>
	</div>
</template>
<script>

export default {
	name: 'Project',
	components: {

	},
	props: {
		project: Object
	},
	data() {
		return {

		}
	},
	computed: {

	},
	methods: {
		/**
		 * Set the current project Id as the opened project.
		 */
		OpenProject() {
			this.$store.commit('SetCurrentTimelineId', this.project.opened_timeline_id);
			this.$store.commit('OpenProject', this.project.id);
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