<template>
	<Dialog v-on:save="CreateNote" v-on:close="Close" width="500">
		<v-card-title class="py-0">
			<v-text-field autofocus label="Title" v-model="title"></v-text-field>
		</v-card-title>
		<ColorPicker padding="20" width="500" v-on:color-selected="ColorSelected" />
		<v-container class="pa-0 px-3">
			<v-card light class="elevation-2" style="border-radius:0;">
				<div id="toolbar">
				</div>
				<div id="editor" style="height:200px;">
				</div>
			</v-card>
			<v-select class="px-2" auto v-bind:items="items" v-model="category" label="Category" single-line return-object required></v-select>
		</v-container>
	</Dialog>
</template>
<script>

import Quill from 'quill'
let editor = null;

export default {
	name: 'CreateNoteDialog',
	data() {
		return {
			title: null,
			description: null,
			category: { text: 'TODO', tag: 'todo' },
			items: [
				{ text: 'TODO', tag: 'todo' },
				{ text: 'In Progress', tag: 'in_progress' },
				{ text: 'Done', tag: 'done' },
			],
			color: '',
		}
	},
	computed: {
		createNote: {
			set(value) {
				this.$store.commit('CreateNoteDialog');
			},

			get() {
				return this.$store.state.AppStore.dialogs.createNote;
			}
		}
	},
	methods: {
		CreateNote() {
			const projectId = this.$store.state.AppStore.openedProjectId;
			const timelineId = this.$store.state.AppStore.currentTimelineId;
			this.$store.commit('CreateNote', {
				project_id: projectId,
				title: this.title,
				description: document.getElementsByClassName("ql-editor")[0].innerHTML,
				category: this.category.tag,
				color: this.color,
				timeline_id: timelineId
			});

			// Cleaning up
			this.category = { text: 'TODO', tag: 'todo' };
			this.title = this.description = null;
			this.createNote = false;
		},

		Close() {
			this.createNote = false
		},

		ColorSelected(color) {
			this.color = color;
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