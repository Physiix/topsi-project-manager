<template>
	<div>
		<CreateNoteDialog v-if="createDialog" />
		<CreateTimelineDialog/>
		<UpdateNoteDialog v-if="updateDialog" />
		<Menu />
		<div id="notes_container">
			<div id="left_container">
				<Content tag="todo" />
			</div>
			<div id="center_container">
				<Content tag="in_progress" />
			</div>
			<div id="right_container">
				<Content tag="done" />
			</div>
		</div>
	</div>
</template>
<script>
import Menu from './Menu.vue'
import AddNoteButton from './AddNoteButton.vue'
import CreateNoteDialog from './CreateNoteDialog.vue'
import CreateTimelineDialog from './CreateTimelineDialog.vue'
import UpdateNoteDialog from './UpdateNoteDialog.vue'
import Content from './Content.vue'
import PaneManager from '../../../../libs/panes/out/Pane'

export default {
	name: 'Notes',
	components: {
		CreateNoteDialog,
		CreateTimelineDialog,
		UpdateNoteDialog,
		Menu,
		Content
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
		}
	},
	mounted() {
		const container = PaneManager.createPaneFromId('notes_container', 1);

		const left_container = PaneManager.createPaneFromId('left_container', 1);
		const center_container = PaneManager.createPaneFromId('center_container', 1);
		const right_container = PaneManager.createPaneFromId('right_container', 1);

		container.addView('left_view', 0.333);
		container.addView('center_view', 0.333);
		container.addView('right_view', 0.3333);

		container.attach(left_container, 'left_view');
		container.attach(center_container, 'center_view');
		container.attach(right_container, 'right_view');

		const drawerWidth = this.$store.state.AppStore.drawerWidth;
		const widthOffset = drawerWidth + 4; // Drawer Width + Scrollbar width

		container.render(drawerWidth, 0, window.innerWidth - widthOffset, window.innerHeight);
		window.addEventListener('resize', () => container.render(drawerWidth, 0, window.innerWidth - widthOffset, window.innerHeight));
	}
}
</script>

<style >
</style>