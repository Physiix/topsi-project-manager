<template>
	<div id="notes_container">
		<CreateNoteDialog v-if="createDialog" />
		<CreateTimelineDialog/>
		<UpdateNoteDialog v-if="updateDialog" />
		<!-- <Menu /> -->
		<div id="left_container">
			<Content tag="todo" />
		</div>
		<v-divider inset vertical></v-divider>
		<div id="center_container">
			<Content tag="in_progress" />
		</div>
		<div id="right_container">
			<Content tag="done" />
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
		const container = document.getElementById('notes_container');

		const resize = () => {
			const drawerWidth = this.$store.state.AppStore.drawerWidth;
			container.style.width = window.innerWidth - 50 + 'px';
			container.style.height = (window.innerHeight - 30) + 'px';
		}
		let value = 250;
		const id = setInterval(() => {
			value -= 8;
			document.getElementById('container').style.setProperty('grid-template-columns',
				+value + 'px repeat(5, 1fr)')
			if (value <= 50) clearInterval(id);
		})

		resize();
		window.addEventListener('resize', resize);
	}
}
</script>

<style >

#notes_container{
	display: grid;
	grid-template-columns: repeat(3, 1fr) 5px;
	grid-template-rows: 1fr;
}

#left_container{
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	overflow-y: auto;
}

#center_container{
	grid-column: 2 / 3;
	grid-row: 1 / 2;
	overflow-y: auto;
}

#right_container{
	grid-column: 3 / 4;
	grid-row: 1 / 2;
	overflow-y: auto;
}

</style>