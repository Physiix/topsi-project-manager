<template>
	<Dialog width="600" v-on:close="Close" v-on:accept="Accept">
		<v-card-title>
			<v-text-field label="Title" v-model="title"></v-text-field>
		</v-card-title>
		<v-container class="pa-0 px-3">
			<v-card light class="elevation-2" style="border-radius:0;">
				<div id="toolbar">
				</div>
				<div id="editor" style="height:180px;">
				</div>
			</v-card>
		</v-container>
		<v-card-title class="py-2">
			<v-toolbar flat class="transparent">
				<v-text-field placeholder="Add a new category" v-model="category" @keyup.enter.native="AddCategory" solo></v-text-field>
				<v-btn flat @click="AddCategory">
					Add
				</v-btn>
			</v-toolbar>
		</v-card-title>
		<v-card class="ma-3 elevation-0">
			<v-toolbar color="indigo darken-2 white--text" dense height="10" style="font-size:8px;">
				<v-spacer></v-spacer>
				Project Manager
				<v-spacer></v-spacer>
			</v-toolbar>
			<v-layout row>
				<v-navigation-drawer class="indigo px-1" permanent stateless height="200" width="50">
					<v-card v-for="i in 5" :key="i" height="5" class="mb-1 elevation-0" style="border-radius:0">

					</v-card>
				</v-navigation-drawer>
				<v-layout row wrap align-center ref="categs" dark>
					<v-flex v-for="(categ,i) in categories" class="text-xs-center pa-0" :key="categ+i">
						<v-card class="pa-0 ma-1 project-category elevation-0" dark height="195" style="cursor:-webkit-grab;">
							<div id="sheet" class="red" @click="RemoveCategory(i)">
								<v-icon id="sheet-icon" dark>close</v-icon>
							</div>
							<p style="font-size:8px;">{{categ}}</p>
						</v-card>
					</v-flex>
				</v-layout>
			</v-layout>
		</v-card>
	</Dialog>
</template>
<script>
import Sortable from 'sortablejs'
import Quill from 'quill'
let editor = null;

export default {
	name: 'ProjectDialogContent',
	props: {
		project: Object
	},
	data() {
		return {
			title: '',
			category: '',
			categories: [],
		}
	},
	computed: {
	},
	methods: {
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
		},

		Close() {
			this.$emit('close');
		},

		Accept() {
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

			// Emit event with the data from the dialog.
			this.$emit('accept', {
				title: this.title,
				description: document.getElementsByClassName("ql-editor")[0].innerHTML,
				categories: categories
			});
		}
	},
	mounted() {
		this.title = this.project.title;
		this.category = this.project.category;
		this.categories = this.project.categories;

		// Setup the draggable elements.
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