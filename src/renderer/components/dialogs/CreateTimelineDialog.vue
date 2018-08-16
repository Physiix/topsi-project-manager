<template>
	<v-dialog v-model="timeline" max-width="400">
		<v-card>
			<v-card-title>
				New Timeline
			</v-card-title>
			<v-divider></v-divider>
			<v-container>
				<v-text-field v-model="title" label="Title"></v-text-field>
			</v-container>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn flat class="ma-0" @click="timeline = false">Cancel</v-btn>
				<v-btn flat class="ma-0" @click="CreateTimeline">Save</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>

export default {
	data() {
		return {
			title: ''
		};
	},

	computed: {
		timeline: {
			set(value) {
				this.$store.commit('CreateTimelineDialog');
			},

			get() {
				return this.$store.state.AppStore.dialogs.createTimeline;
			}
		}
	},

	methods: {
		CreateTimeline() {
			const projectId = this.$store.state.AppStore.openedProjectId;
			const data = {
				title: this.title,
				project_id: projectId
			}
			this.$store.commit('CreateTimeline', data);
			this.$store.commit('CreateTimelineDialog');
		}
	}
}
</script>

<style scoped>

</style>