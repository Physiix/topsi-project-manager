<template>
	<Dialog width="600" height="500" v-on:close="Close" v-on:accept="Accept">
		<ConfirmDialog v-if="deleteDialog" :title="$lang.Get('delete') + ' ' + project.title" :message="$lang.Get('confirmDeleteMessage')" :accept-msg="$lang.Get('delete')" v-on:accept="Delete" v-on:cancel="deleteDialog = false" accept-color="error" />
		<v-tabs fixed-tabs color="transparent">
			<v-tab>
				{{$lang.Get('project')}}
			</v-tab>
			<v-tab>
				{{$lang.Get('layoutAndOptions')}}
			</v-tab>
			<v-tabs-items v-model="tabItem">
				<v-tab-item>
					<v-btn block color="error" v-if="enableDelete" @click="deleteDialog = true" style="border-radius:0;">{{$lang.Get('delete')}}</v-btn>
					<v-card-title>
						<v-text-field :label="$lang.Get('title')" v-model="title"></v-text-field>
					</v-card-title>
					<v-container class="pa-0 px-3">
						<v-card light class="elevation-2" style="border-radius:0;">
							<div id="toolbar">
							</div>
							<div id="editor" style="height:180px;">
							</div>
						</v-card>
					</v-container>
				</v-tab-item>
				<v-tab-item>
					<v-card class="ma-3 elevation-0 px-5 transparent">
						<v-toolbar :color="color" class="darken-2 white--text elevation-3" dense height="10" style="font-size:8px;">
							<v-spacer></v-spacer>
							{{this.$lang.Get('projectName')}}
							<v-spacer></v-spacer>
						</v-toolbar>
						<v-layout row class="white py-0 elevation-2">
							<v-navigation-drawer :class="color" class="px-1 pt-1" permanent stateless height="205" width="50">
								<v-card v-for="i in 5" :key="i" height="5" class="mb-1 elevation-0" style="border-radius:0" light>
								</v-card>
							</v-navigation-drawer>
							<v-layout row wrap align-center ref="categs">
								<v-flex v-for="(categ,i) in categories" class="text-xs-center pa-0 " :key="categ+i">
									<v-card class="pa-0 ma-1 project-category elevation-0" dark height="195" style="cursor:-webkit-grab;">
										<div id="sheet" class="red" @click="RemoveCategory(i)">
											<v-icon id="sheet-icon" dark>close</v-icon>
										</div>
										<p style="font-size:8px;">{{categ}}</p>
										<v-card v-for="i in 5" :key="i" height="20" class="ma-2 grey"> </v-card>
									</v-card>
								</v-flex>
								<v-btn fab flat id="add-category-btn" @click="FocusAddCategory">
									<v-icon :color="color">
										add
									</v-icon>
								</v-btn>
								<FloatingDiv activator-id="add-category-btn" v-on:action="" dark right release-key="Enter">
									<v-card>
										<v-toolbar class="px-2" color="secondary" height="55">
											<v-text-field ref="add_category" v-model="category" placeholder="Category" @keyup.enter.native="AddCategory" class="pt-2" autofocus></v-text-field>
											<v-btn flat @click="AddCategory">
												Add
											</v-btn>
										</v-toolbar>
									</v-card>
								</FloatingDiv>
							</v-layout>
						</v-layout>
					</v-card>
					<v-card class="px-4 pt-5 transparent">
						<FolderInput :label="this.$lang.Get('projectDialogFolderLabel')" v-model="customPath"></FolderInput>
					</v-card>
				</v-tab-item>
			</v-tabs-items>
		</v-tabs>
	</Dialog>
</template>
<script>
import ConfirmDialog from './ConfirmDialog.vue'
import Sortable from 'sortablejs'
import Quill from 'quill'
import Utils from '../../../core/Utils';
let editor = null;

export default {
	name: 'ProjectDialogContent',
	components: {
		ConfirmDialog
	},
	props: {
		project: Object,
		enableDelete: Boolean
	},
	data() {
		return {
			title: '',
			category: '',
			categories: [],
			customPath: '',
			tabItem: null,
			deleteDialog: false,
		}
	},
	computed: {
		color() {
			return this.$store.getters.appColor;
		}
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
					title: category,
					folded: false,
				});
			})

			// Emit event with the data from the dialog.
			this.$emit('accept', {
				title: this.title,
				description: document.getElementsByClassName("ql-editor")[0].innerHTML,
				categories: categories,
				customPath: this.customPath
			});
		},

		/**
		 * Delete the current project.
		 * Returns to the project's page when deleted.
		 */
		Delete() {
			this.deleteDialog = false;
			// Delete the project from the database/
			this.$store.dispatch('DeleteProject', this.project);
		},


		FocusAddCategory() {
			Utils.FocusTextField(this.$refs.add_category.$el);
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
		document.getElementsByClassName("ql-editor")[0].innerHTML = this.project.description;
	},

	created() {
		this.customPath = this.project.customPath || this.$store.getters.defaultPath;
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