<template>
	<Dialog v-on:accept="UpdateNote" v-on:close="Close" width="500">
		<v-card-title class="py-0">
			<v-text-field autofocus label="Title" v-model="title"></v-text-field>
		</v-card-title>
		<ColorPicker width="500" padding="20" v-on:color-selected="ColorSelected"></ColorPicker>
		<v-container class="pa-0 px-3 pb-5">
			<v-card light class="elevation-2" style="border-radius:0;">
				<div id="toolbar"></div>
				<div id="editor" style="height:200px;"></div>
			</v-card>
			<v-autocomplete :items="tagItems" :search-input.sync="tagSearch" v-model="selectedTags" cache-items class="pt-2" value="Feature" small-chips flat hide-details chips label="Tags?" solo color="primary" multiple no-data-text="No tag found. Tags needs to be created before being used."></v-autocomplete>
			<v-select class="px-2" auto v-bind:items="milestoneItems" v-model="milestone" label="Milestone" title="Milestone" single-line return-object required></v-select>
			<v-select class="px-2" auto v-bind:items="items" v-model="category" label="Category" single-line return-object required></v-select>
		</v-container>
	</Dialog>
</template>
<script>

import Quill from 'quill'
let editor = null;

export default {
	name: 'UpdateNoteDialog',
	data() {
		return {
			title: null,
			description: null,
			category: null,
			items: [],
			milestoneItems: [],
			milestone: null,
			color: null,
			tagSearch: null,
			selectedTags: [],
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
		},

		project() {
			const id = this.$store.state.AppStore.openedProjectId;
			return this.$store.getters.GetProjectById(id);
		},

		categories() {
			return this.project.categories;
		},

		milestones() {
			return this.$store.getters.GetMilestones;
		},

		tagItems() {
			return this.$store.getters.getProjectTags.map(tag => tag.tag);
		},

		tags() {
			return this.$store.getters.getProjectTags;
		},
	},
	methods: {
		UpdateNote() {
			const projectId = this.$store.state.AppStore.openedProjectId;

			// Getting the selected tags.
			const tags = [];
			this.selectedTags.forEach(tagName =>
				this.tags.forEach(entry => {
					if (entry.tag == tagName) tags.push(entry);
				})
			);

			// Update the note
			this.$store.commit('UpdateNote', {
				id: this.note.id,
				project_id: projectId,
				title: this.title,
				description: document.getElementsByClassName("ql-editor")[0].innerHTML,
				category: this.category.tag,
				color: this.color,
				milestone_id: this.milestone.id,
				tags: tags
			});

			// Cleaning up
			this.category = { text: 'TODO', tag: 'todo' };
			this.title = this.description = null;
			this.updateNote = false;
		},

		Close() {
			this.updateNote = false
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

		// Setup the categories
		this.categories.forEach(category => this.items.push({ text: category.title, tag: category.tag }))

		// Setup the milestones
		this.milestones.forEach(milestone => this.milestoneItems.push({ text: `Milestone: ${milestone.title}`, id: milestone.id }))

		// Populate the content
		this.title = this.note.title;
		document.getElementsByClassName("ql-editor")[0].innerHTML = this.note.description;
		this.category = this.items.filter(i => i.tag == this.note.category)[0];
		this.color = this.note.color;
		this.milestone = this.milestoneItems.filter(m => m.id == this.note.milestone_id)[0];
		this.note.tags.forEach(entry => this.selectedTags.push(entry.tag))
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