<template>
	<Dialog v-on:close="Delete" v-on:accept="Close" width="800" accept-text="Close" cancel-text="delete" cancel-raised cancel-color="error" accept-color=" ">
		<div id="visualize-dialog">
			<v-card-title class="py-0 pt-5 headline">
				{{note.title}}
			</v-card-title>
			<NoteTags class="px-2" :tags="note.tags" />
			<v-container class="dialog-container pt-5" v-html="note.description">
			</v-container>
		</div>
	</Dialog>
</template>
<script>
import { Notifications } from '../../../core/Notification'

import NoteTags from '../notes/NoteTags.vue'

export default {
	name: 'VisualizeNoteDialog',
	components: {
		NoteTags
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
				this.$store.commit('OpenNoteDialog');
			},
			get() {
				return this.$store.state.AppStore.dialogs.openedNote;
			}
		}
	},
	methods: {
		Close() {
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