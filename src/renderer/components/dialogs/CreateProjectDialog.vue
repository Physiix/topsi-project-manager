<template>
	<Dialog width="500" v-on:close="createProject = false" v-on:accept="CreateProject">
		<v-card-title>
			<v-text-field label="Title" v-model="title"></v-text-field>
		</v-card-title>
		<v-card-title>
			<v-textarea label="Description" v-model="description"></v-textarea>
		</v-card-title>
		<v-divider class="py-3"></v-divider>
		<v-card-title>
			<v-text-field placeholder="Add a new category" v-model="category" @keyup.enter.native="AddCategory"></v-text-field>
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

export default {
	name: 'CreateProjectDialog',
	data() {
		return {
			title: '',
			description: '',
			category: '',
			categories: [
				'TODO',
				'In Progress',
				'Done'
			]
		}
	},
	computed: {
		createProject: {
			set(value) {
				this.$store.commit('CreateProjDialog');
			},
			get() {
				return this.$store.state.AppStore.dialogs.createProject;
			}
		}
	},
	methods: {
		/**
		 * Handle the 'Save' button click.
		 */
		CreateProject() {
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

			console.log('cate', categories)

			// Create the project.
			this.$store.commit('CreateProject', {
				title: this.title,
				description: this.description,
				categories: categories
			});

			// Clean up the text fields and close dialog.
			this.title = '';
			this.description = '';
			this.createProject = false;
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
		const element = this.$refs.categs;
		console.log(element)
		const sortable = Sortable.create(element, {
			group: {
				name: "Categories",
			},
			onEnd: (event) => {
				console.log(event);
				let newIndex = (event.oldIndex < event.newIndex) ? event.newIndex + 1 : event.newIndex;
				const tmp = this.categories[event.oldIndex];
				this.categories.splice(event.oldIndex, 1);
				this.categories.splice(newIndex, 0, tmp);
			},
			animation: 100

		});
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