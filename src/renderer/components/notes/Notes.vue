<template>
	<div id="notes_container" :class="color" class="pa-0">
		<CreateNoteDialog v-if="createDialog" />
		<!-- <CreateTimelineDialog/> -->
		<VisualizeNoteDialog v-if="visualizeDialog"></VisualizeNoteDialog>
		<UpdateNoteDialog v-if="updateDialog" />
		<UpdateProjectDialog v-if="updateProject" />
		<div v-for="(category, index) in categories" :key="category+index" :id="category.tag+'-container'" class="category-container">
			<Content :id="category.tag+'-content'" :category="category" />
		</div>
	</div>
</template>
<script>
import { EventsManager } from '../../../core/EventManager.js';
import { AppManager } from '../../../core/ApplicationManager';


import Menu from './Menu.vue'
import AddNoteButton from './AddNoteButton.vue'
import CreateNoteDialog from '../dialogs/CreateNoteDialog.vue'
import CreateTimelineDialog from '../dialogs/CreateTimelineDialog.vue'
import VisualizeNoteDialog from '../dialogs/VisualizeNoteDialog.vue'
import UpdateNoteDialog from '../dialogs/UpdateNoteDialog.vue'
import UpdateProjectDialog from '../dialogs/UpdateProjectDialog.vue'
import Content from './Content.vue'

export default {
	name: 'Notes',
	components: {
		CreateNoteDialog,
		CreateTimelineDialog,
		UpdateNoteDialog,
		VisualizeNoteDialog,
		UpdateProjectDialog,
		Menu,
		Content
	},
	computed: {
		project() {
			const id = this.$store.state.AppStore.openedProjectId;
			return this.$store.getters.GetProjectById(id);
		},

		categories() {
			return this.project.categories;
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

		updateProject() {
			return this.$store.getters.isUpdateProject;
		},

		color() {
			if (this.$store.getters.IsDarkMode)
				return '';
			else return 'grey lighten-2'
		},
	},
	mounted() {
		AppManager.SetupNotesPage('notes_container', 'container', this.categories.map(category => category.tag));
		EventsManager.Subscribe('update-notes-component', () => {
			this.$nextTick(() => {
				AppManager.SetupNotesPage('notes_container', 'container', this.categories.map(category => category.tag));
			});
		});
	}
}
</script>

<style >

.category-container{
	overflow-y: auto;
}

</style>