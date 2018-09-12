<template>
	<NoteDialogContent :note="note" v-on:close="Close" v-on:accept="CreateNote" />
</template>
<script>
import NoteDialogContent from './NoteDialogContent.vue'


export default {
	name: 'CreateNoteDialog',
	components: {
		NoteDialogContent
	},
	computed: {
		createNote: {
			set(value) {
				this.$store.dispatch('ToggleDialog', 'createNote');
			},

			get() {
				return this.$store.state.AppStore.dialogs.createNote;
			}
		},

		project() {
			const id = this.$store.state.AppStore.openedProjectId;
			return this.$store.getters.getProjectById(id);
		},

		note() {
			return {
				title: '',
				description: '',
				category: { text: 'TODO', tag: 'todo' },
				tags: [],
				milestone_id: this.project.opened_milestone_id
			}
		}
	},
	methods: {
		CreateNote(data) {
			// Create the note
			this.$store.dispatch('CreateNote', {
				project_id: this.project.id,
				title: data.title,
				description: data.description,
				category: data.category,
				color: data.color,
				milestoneId: data.milestoneId,
				tags: data.tags
			});
			this.createNote = false;
		},

		Close() {
			this.createNote = false
		},
	}
}
</script>

<style scoped>

.color_item{
	min-width: 40px !important;
	max-width: 40px !important;
	max-height: 15px !important;
	border-radius: 0;
	margin: 0 0 0 0;
}
</style>