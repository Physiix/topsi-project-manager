<template>
	<Dialog v-on:close="Close" v-on:accept="Delete" width="800" cancel-text="Close" accept-text="delete" accept-raised accept-color="error">
		<div id="visualize-dialog">
			<v-card-title class="py-0 pt-5 headline">
				{{note.title}}
			</v-card-title>
			<v-container class="dialog-container pt-5" v-html="note.description">
			</v-container>
		</div>
	</Dialog>
</template>
<script>
import { Notifications } from '../../../core/Notification'

export default {
	name: 'VisualizeNoteDialog',
	computed: {
		note() {
			return this.$store.state.NotesStore.openedNote;
		},
		darkMode() {
			return this.$store.state.AppStore.darkMode;
		},
		openedNote: {
			set(value) {
				this.$store.commit('OpenNoteDialog');
			},
			get() {
				return this.$store.state.AppStore.dialogs.openedNote;
			}
		}
	},
	methods: {

		Close() {
			Notifications.Info('test', 'something');
			this.openedNote = false;
		},

		Delete() {
			this.$store.commit('DeleteNote', this.note);
		}
	}
}
</script>

<style >

#visualize-dialog{
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