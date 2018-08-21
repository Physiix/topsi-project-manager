<template>
	<Dialog width="500" v-on:close="updateProject = false" v-on:accept="UpdateProject" accept-text="Update">
		<v-card-title>
			<v-text-field label="Title" v-model="title"></v-text-field>
		</v-card-title>
		<v-container class="pa-0 px-3">
			<v-card light class="elevation-2" style="border-radius:0;">
				<div id="toolbar">
				</div>
				<div id="editor" style="height:200px;">
				</div>
			</v-card>
		</v-container>
		<v-divider class="mt-4"></v-divider>
		<v-card-title>
			<v-toolbar flat class="pa-1" color="transparent">
				<v-text-field placeholder="Add a new category" v-model="category" @keyup.enter.native="AddCategory" solo></v-text-field>
				<v-btn flat @click="AddCategory">
					Add
				</v-btn>
			</v-toolbar>

		</v-card-title>
		<v-card-title>
			<v-layout row wrap align-center ref="categs" dark>
				<v-flex v-for="(categ,i) in categories" class="text-xs-center" :key="categ+i">
					<v-card class="pa-0 ma-1 project-category elevation-1" dark>
						<div id="sheet" class="red" @click="RemoveCategory(i)">
							<v-icon id="sheet-icon" dark>close</v-icon>
						</div>
						<p style="font-size:8px;">{{categ}}</p>
					</v-card>
				</v-flex>
			</v-layout>
		</v-card-title>
	</Dialog>
</template>
<script>
import Sortable from 'sortablejs'
import Quill from 'quill'

let editor = null;

export default {
	name: 'UpdateProjectDialog',
	data() {
		return {
			title: '',
			description: '',
			category: '',
			categories: []
		}
	},
	computed: {
		updateProject: {
			set(value) {
				this.$store.commit('ToggleUpdateProject');
			},
			get() {
				return this.$store.getters.isUpdateProject;
			}
		},

		project() {
			return this.$store.getters.getCurrentProject(this);
		}
	},
	methods: {
		/**
		 * Handle the 'Save' button click.
		 */
		UpdateProject() {
			// Format the categories.
			const categories = [];
			this.categories.forEach(category => {
				let categ = category.replace(/ /g, '_')
				categ = categ.toLowerCase();
				categories.push({
					tag: categ,
					title: category
				});
			})

			// Update the project.
			this.$store.commit('UpdateProject', {
				id: this.project.id,
				title: this.title,
				description: document.getElementsByClassName("ql-editor")[0].innerHTML,
				categories: categories
			});

			this.$forceUpdate();

			// Clean up the text fields and close dialog.
			this.title = '';
			this.description = '';
			this.updateProject = false;
			this.categories = []
		},

		/**
		 * Add a new category to the project.
		 */
		AddCategory() {
			// Make sure the category is valid.
			if (this.category.length <= 0) return;
			this.categories.push(this.category);
			this.category = '';
		},

		/**
		 * Remove a category from the project.
		 */
		RemoveCategory(index) {
			this.categories.splice(index, 1);
		}
	},

	mounted() {
		this.categories = this.project.categories.map(category => category.title);

		const element = this.$refs.categs;
		const sortable = Sortable.create(element, {
			group: {
				name: "Categories",
			},
			onEnd: (event) => {
				let newIndex = (event.oldIndex < event.newIndex) ? event.newIndex + 1 : event.newIndex;
				const tmp = this.categories[event.oldIndex];
				this.categories.splice(event.oldIndex, 1);
				this.categories.splice(newIndex, 0, tmp);
			},
			animation: 100
		});

		// Setup QUILL
		const options = {
			modules: {
				toolbar: [
					[{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
					['bold', 'italic', 'underline', 'strike'],        // toggled buttons

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

		this.title = this.project.title;
		document.getElementsByClassName("ql-editor")[0].innerHTML = this.project.description;
	}
}
</script>

<style scoped>
.project-category{
	height:100px;
}

#sheet{
	visibility: hidden;
	height:0;
	transition: .1s;
	cursor: pointer;
}
#sheet-icon{
	transition: .0s;
	padding-top: 3px;
}
.project-category:hover #sheet{
	visibility: visible;
	height:30px;
}

</style>