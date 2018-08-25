<template>
	<Dialog v-on:accept="CreateNote" v-on:close="Close" width="500">
		<v-card-title class="py-0">
			<v-text-field autofocus label="Title" v-model="title"></v-text-field>
		</v-card-title>
		<ColorPicker padding="20" width="500" v-on:color-selected="ColorSelected" />
		<v-container class="pa-0 px-3 pb-5">
			<v-card light class="elevation-2" style="border-radius:0;">
				<div id="toolbar">
				</div>
				<div id="editor" style="height:200px;">
				</div>
			</v-card>
			<v-autocomplete :items="tagItems" :search-input.sync="tagSearch" v-model="selectedTags" cache-items class="pt-2" small-chips flat hide-details chips label="Tags?" solo color="primary" multiple :no-data-text="this.$lang.Get('noTagFound')"></v-autocomplete>
			<v-select class="px-2" auto v-bind:items="milestoneItems" v-model="milestone" :label="this.$lang.Get('milestone')" :title="this.$lang.Get('milestone')" single-line return-object required></v-select>
			<v-select class="px-2" auto v-bind:items="items" v-model="category" :label="this.$lang.Get('category')" single-line return-object required></v-select>
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
			items: [],
			milestoneItems: [],
			milestone: null,
			color: '',
			tagSearch: null,
			selectedTags: [],
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
		CreateNote() {
			const projectId = this.$store.state.AppStore.openedProjectId;
			const milestoneId = this.$store.getters.getCurrentMilestoneId;
			console.log(milestoneId)

			// Getting the selected tags.
			const tags = [];
			this.selectedTags.forEach(tagName =>
				this.tags.forEach(entry => {
					if (entry.tag == tagName) tags.push(entry);
				})
			);

			// Create the note
			this.$store.commit('CreateNote', {
				project_id: projectId,
				title: this.title,
				description: document.getElementsByClassName("ql-editor")[0].innerHTML,
				category: this.category.tag,
				color: this.color,
				milestoneId: milestoneId,
				tags: tags
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

		// Setup the categories
		this.categories.forEach(category => this.items.push({ text: category.title, tag: category.tag }))
		this.category = this.items[0];

		// Setup the milestones
		this.milestones.forEach(milestone => this.milestoneItems.push({ text: `Milestone: ${milestone.title}`, id: milestone.id }))
		this.milestone = this.milestoneItems.filter(m => m.id == this.project.opened_milestone_id)[0];
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