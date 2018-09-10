<template>
	<Dialog v-on:close="Delete" v-on:accept="Close" width="800" :accept-text="$lang.Get('close')" :cancel-text="$lang.Get('delete')" cancel-raised cancel-color="error" accept-color=" ">
		<div id="visualizer-dialog">
			<v-btn absolute top right style="margin-top:30px;z-index:5;" icon @click="ToggleLayout">
				<Tooltip bottom content="Tasks">
					<v-icon>
						fa-tasks
					</v-icon>
				</Tooltip>
			</v-btn>
			<div id="visualizer-content">
				<div id=""></div>
				<v-card-title class="pl-4 py-0 pt-2 headline">
					{{note.title}}
				</v-card-title>
				<NoteTags class="px-4" :tags="note.tags" />
				<v-container class="dialog-container pt-5" v-html="note.description">
				</v-container>
			</div>
			<div id="visualizer-side">
				<Tasks v-if="opened"></Tasks>
			</div>
		</div>
	</Dialog>
</template>
<script>
import ApplicationManager from '../../../core/ApplicationManager'
import Notifications from '../../../core/Notifications'

import NoteTags from '../notes/NoteTags.vue'
import Tasks from './Tasks.vue'

export default {
	name: 'VisualizeNoteDialog',
	components: {
		NoteTags,
		Tasks
	},
	data() {
		return {
			opened: false,
			height: 350,
		}
	},
	computed: {
		note() {
			return this.$store.state.NotesStore.openedNote;
		},
		darkMode() {
			return this.$store.state.AppStore.darkMode;
		},
		openedNote: {
			set(value) {
				this.$store.dispatch('ToggleDialog', 'visualizeDialog');
			},
			get() {
				return this.$store.state.AppStore.dialogs.openedNote;
			}
		},
	},
	methods: {
		Close() {
			this.openedNote = false;
		},

		Delete() {
			this.$store.dispatch('DeleteNote', this.note);
		},

		ToggleLayout() {
			if (this.opened) {
				ApplicationManager.CloseVisualizerSide('visualizer-dialog', this.height);
				this.opened = false;
			}
			else ApplicationManager.OpenVisualizerSide('visualizer-dialog', this.height, () => this.opened = true);
		}
	},
	mounted() {
		ApplicationManager.SetupVisualizer('visualizer-dialog', 'visualizer-content', 'visualizer-side');
	}
}
</script>

<style >

#visualizer-dialog{
	overflow-x: hidden;
	overflow-y: auto;
}

.color_item{
	min-width: 40px !important;
	max-width: 40px !important;
	max-height: 15px !important;
	border-radius: 0;
	margin: 0 0 0 0;
}
.dialog-container img{
	width: 100%;
}

</style>