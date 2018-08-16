<template>
	<Dialog v-on:save="UpdateNote" v-on:close="Close" width="500">
		<v-card-title class="py-0">
			<v-text-field autofocus label="Title" v-model="title"></v-text-field>
		</v-card-title>
		<v-container class="pa-0 px-3">
			<v-card light class="elevation-2" style="border-radius:0;">
				<div id="toolbar"></div>
				<div id="editor" style="height:200px;"></div>
			</v-card>
			<v-select class="px-2" auto v-bind:items="items" v-model="category" label="Category" single-line return-object required></v-select>
		</v-container>
	</Dialog>
	<!-- </v-dialog> -->
</template>
<script>

import Quill from 'quill'
let editor = null;

export default { //SetUpdatedNote
	name: 'UpdateNoteDialog',
	data() {
		return {
			title: null,
			description: null,
			category: { text: 'TODO', tag: 'todo' },
			items: [
				{ text: 'TODO', tag: 'todo' },
				{ text: 'In Progress', tag: 'in_progress' },
				{ text: 'Done', tag: 'done' },
			]
		}
	},
	computed: {
		note() {
			return this.$store.state.NotesStore.updatedNote;
		},
		darkMode() {
			return this.$store.state.AppStore.darkMode;
		},
		updateNote: {
			set(value) {
				this.$store.commit('UpdateNoteDialog');
			},
			get() {
				return this.$store.state.AppStore.dialogs.updateNote;
			}
		}
	},
	methods: {
		UpdateNote() {
			const projectId = this.$store.state.AppStore.openedProjectId;
			const timelineId = this.$store.state.AppStore.currentTimelineId;
			this.$store.commit('UpdateNote', {
				id: this.note.id,
				project_id: projectId,
				title: this.title,
				description: document.getElementsByClassName("ql-editor")[0].innerHTML,
				category: this.category.tag,
				color: this.currentColor,
			});

			// Cleaning up
			this.category = { text: 'TODO', tag: 'todo' };
			this.title = this.description = null;
			this.updateNote = false;
		},

		Close() {
			this.updateNote = false
		}
	},
	mounted() {
		const options = {
			modules: {
				toolbar: [
					[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
					['bold', 'italic', 'underline', 'strike', 'image'],        // toggled buttons
					['blockquote', 'code-block'],

					[{ 'header': 1 }, { 'header': 2 }],               // custom button values
					[{ 'list': 'ordered' }, { 'list': 'bullet' }],
					[{ 'direction': 'rtl' }],                         // text direction


					[{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
					[{ 'align': [] }],

					['clean']                                         // remove formatting button
				]
			},
			placeholder: 'Compose an epic...',
			theme: 'snow'  // or 'bubble'
		};
		editor = new Quill('#editor', options);

		// Populate the content
		this.title = this.note.title;
		document.getElementsByClassName("ql-editor")[0].innerHTML = this.note.description;
		this.category = this.items.filter(i => i.tag == this.note.category)[0];
		this.currentColor = 'default';
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