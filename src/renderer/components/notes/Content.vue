<template>
	<div id="container">
		<div id="top">
			<v-toolbar color="secondary" dark class="elevation-0" dense>
				<v-toolbar-title class="subheading" scroll-off-screen>
					{{title}}
				</v-toolbar-title>
			</v-toolbar>
		</div>
		<div id="bottom">
			<div v-for="(note, index) in notes" :key="index">
				<Note :note="note" />
			</div>
		</div>
	</div>
</template>
<script>
import Note from './Note.vue'

export default {
	name: 'Content',
	components: {
		Note
	},
	props: {
		tag: String
	},
	data() {
		return {

		}
	},
	computed: {
		title() {
			return this.tag == 'todo' ? 'TODO' : this.tag == 'in_progress' ? 'In Progress' : 'Done';
		},

		notes() {
			const timelineId = this.$store.state.AppStore.currentTimelineId;
			return this.$store.getters.GetNotesById(this.$store.state.AppStore.openedProjectId).filter(note => note.timeline_id == timelineId && note.category == this.tag);
		}
	},
	methods: {

	},
}
</script>

<style scoped>

#container{
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 48px 1fr;
	height: 100%;
}

#top{
	grid-column: 1 / 2;
	grid-row: 1 / 2;
}

#bottom{
	grid-column: 1 / 2;
	grid-row: 2 / 3;
	overflow-y: auto;
}

#title_card{
	border-radius: 0;
}
</style>