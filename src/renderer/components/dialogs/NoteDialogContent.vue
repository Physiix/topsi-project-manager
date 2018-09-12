<template>
	<Dialog v-on:accept="Accept" v-on:close="Close" width="500">
		<v-card-title class="py-0">
			<v-text-field autofocus :label="$lang.Get('title')" v-model="title"></v-text-field>
		</v-card-title>
		<ColorPicker width="500" padding="20" v-on:color-selected="ColorSelected"></ColorPicker>
		<v-container class="pa-0 px-3 pb-5">
			<v-card light class="elevation-2" style="border-radius:0;">
				<div id="toolbar"></div>
				<div id="editor" style="height:200px;"></div>
			</v-card>
			<v-autocomplete :items="tagItems" :search-input.sync="tagSearch" v-model="selectedTags" cache-items class="pt-2" value="Feature" small-chips flat hide-details chips :label="$lang.Get('tags')" solo color="primary" multiple no-data-text="No tag found. Tags needs to be created before being used."></v-autocomplete>
			<v-select class="px-2" auto v-bind:items="milestoneItems" v-model="milestone" single-line return-object required></v-select>
			<v-select class="px-2" auto v-bind:items="items" v-model="category" label="Category" single-line return-object required></v-select>
		</v-container>
	</Dialog>
</template>
<script>
import Quill from 'quill'
let editor = null;

export default {
	name: 'NoteDialogContent',
	props: {
		note: Object
	},
	data() {
		return {
			title: null,
			tagSearch: null,
			selectedTags: [],
			milestoneItems: [],
			milestone: null,
			items: [],
			category: null,
			color: null
		}
	},
	computed: {

		tagItems() {
			return this.$store.getters.projectTags.map(tag => tag.tag);
		},

		project() {
			const id = this.$store.state.AppStore.openedProjectId;
			return this.$store.getters.getProjectById(id);
		},

		categories() {
			return this.project.categories;
		},
		darkMode() {
			return this.$store.state.AppStore.darkMode;
		},
		project() {
			const id = this.$store.state.AppStore.openedProjectId;
			return this.$store.getters.getProjectById(id);
		},

		milestones() {
			return this.$store.getters.milestones;
		},

		tagItems() {
			return this.$store.getters.projectTags.map(tag => tag.tag);
		},

		tags() {
			return this.$store.getters.projectTags;
		},
	},
	methods: {
		Accept() {
			const projectId = this.$store.state.AppStore.openedProjectId;

			// Getting the selected tags.
			const tags = [];
			this.selectedTags.forEach(tagName =>
				this.tags.forEach(entry => {
					if (entry.tag == tagName) tags.push(entry);
				})
			);

			this.$emit('accept', {
				id: this.note.id,
				projectId: projectId,
				title: this.title,
				description: document.getElementsByClassName("ql-editor")[0].innerHTML,
				category: this.category.tag,
				color: this.color,
				milestoneId: this.milestone.id,
				tags: tags
			});
		},
		Close() {
			this.$emit('close');
		},

		ColorSelected(color) {
			this.color = color;
		},
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
		this.category = this.items.filter(i => i.tag == this.note.category)[0] || this.items[0];
		this.color = this.note.color || '';
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