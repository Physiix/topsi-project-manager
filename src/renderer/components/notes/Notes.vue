<template>
	<div id="notes_container" :class="color" class="pa-0">
		<CreateNoteDialog v-if="createDialog" />
		<VisualizeNoteDialog v-if="visualizeDialog"></VisualizeNoteDialog>
		<UpdateNoteDialog v-if="updateDialog" />
		<UpdateProjectDialog v-if="updateProject" />
		<div v-for="(category, index) in categories" :key="category+index" :id="category.tag+'-container'" class="category-container">
			<Content :projectId="projectId" v-if="!category.folded" :id="category.tag+'-content'" :category="category" />
			<FoldedContent v-else :projectId="projectId" :category="category" />
		</div>
		<MilestonesList />
	</div>
</template>
<script>
import EventManager from '../../../core/EventManager.js';
import AppManager from '../../../core/ApplicationManager';


import MilestonesList from './MilestonesList.vue'
import FoldedContent from './FoldedContent.vue'
import AddNoteButton from './AddNoteButton.vue'
import CreateNoteDialog from '../dialogs/CreateNoteDialog.vue'
import VisualizeNoteDialog from '../dialogs/VisualizeNoteDialog.vue'
import UpdateNoteDialog from '../dialogs/UpdateNoteDialog.vue'
import UpdateProjectDialog from '../dialogs/UpdateProjectDialog.vue'
import Content from './Content.vue'

export default {
	name: 'Notes',
	components: {
		CreateNoteDialog,
		UpdateNoteDialog,
		VisualizeNoteDialog,
		UpdateProjectDialog,
		Content,
		FoldedContent,
		MilestonesList
	},
	computed: {
		projectId() {
			return this.$store.state.AppStore.openedProjectId;
		},

		project() {
			const id = this.projectId;
			return this.$store.getters.getProjectById(id);
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
			if (this.$store.getters.isDarkMode)
				return '';
			else return 'grey lighten-2'
		},

		macos() {
			return this.$store.getters.isMac;
		}
	},
	mounted() {
		AppManager.SetupNotesPage((this.macos ? 0 : 30), 'notes_container', 'container', this.categories.filter(category => !category.folded).map(category => category.tag), this.categories.filter(category => category.folded).map(category => category.tag));
		EventManager.Subscribe('update-notes-component', () => {
			this.$nextTick(() => {
				AppManager.SetupNotesPage((this.macos ? 0 : 30), 'notes_container', 'container', this.categories.filter(category => !category.folded).map(category => category.tag), this.categories.filter(category => category.folded).map(category => category.tag), false);
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