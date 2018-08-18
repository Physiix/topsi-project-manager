<template>
	<div id="notes_container" :class="color" class="pa-0">
		<CreateNoteDialog v-if="createDialog" />
		<!-- <CreateTimelineDialog/> -->
		<VisualizeNoteDialog v-if="visualizeDialog"></VisualizeNoteDialog>
		<UpdateNoteDialog v-if="updateDialog" />

		<div v-for="(category, index) in categories" :key="category+index" :id="category+'-container'" class="category-container">
			<Content :id="category+'-content'" :tag="category" />
		</div>
	</div>
</template>
<script>
import Menu from './Menu.vue'
import AddNoteButton from './AddNoteButton.vue'
import CreateNoteDialog from '../dialogs/CreateNoteDialog.vue'
import CreateTimelineDialog from '../dialogs/CreateTimelineDialog.vue'
import VisualizeNoteDialog from '../dialogs/VisualizeNoteDialog.vue'
import UpdateNoteDialog from '../dialogs/UpdateNoteDialog.vue'
import Content from './Content.vue'
import { AppManager } from '../../../core/ApplicationManager';

export default {
	name: 'Notes',
	components: {
		CreateNoteDialog,
		CreateTimelineDialog,
		UpdateNoteDialog,
		VisualizeNoteDialog,
		Menu,
		Content
	},
	data() {
		return {
			categories: [
				'todo',
				'in_progress',
				'done'
			]
		}
	},
	computed: {
		project() {
			const id = this.$store.state.AppStore.openedProjectId;
			return this.$store.getters.GetProjectById(id);
		},

		createDialog() {
			return this.$store.state.AppStore.dialogs.createNote
		},

		updateDialog() {
			return this.$store.state.AppStore.dialogs.updateNote
		},

		visualizeDialog() {
			return this.$store.state.AppStore.dialogs.visualizeDialog;
		},

		color() {
			if (this.$store.getters.IsDarkMode)
				return '';
			else return 'grey lighten-2'
		}
	},
	mounted() {
		AppManager.SetupNotesPage('notes_container', 'container', 'todo', 'in_progress', 'done');
	}
}
</script>

<style >

.category-container{
	overflow-y: auto;
}

</style>