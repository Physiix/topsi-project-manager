<template>
	<div>
		<v-dialog v-model="createNote" max-width="300">
			<v-card>
				<v-card-title class="py-1" :class="currentColor">New Note
					<v-spacer></v-spacer>
					<v-btn class="ma-0" :class="currentColor" icon @click="currentColor = ''">
						<v-icon>sync</v-icon>
					</v-btn>
				</v-card-title>
				<v-container>
					<v-layout row>
						<v-spacer></v-spacer>
						<v-btn v-for="(color, index) in colors" :key="index" class="color_item" :color="color" @click="currentColor = color"></v-btn>
						<v-spacer></v-spacer>
					</v-layout>
					<v-text-field label="Title" v-model="title"></v-text-field>
					<v-text-field label="Description" v-model="description" multi-line></v-text-field>
					<v-select auto v-bind:items="items" v-model="category" label="Category" single-line return-object required></v-select>
				</v-container>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn flat class="ma-0" @click="createNote = false">Cancel</v-btn>
					<v-btn flat class="ma-0" @click="CreateNote">Save</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>

export default {
	name: 'CreateNoteDialog',
	components: {

	},
	props: {

	},
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
			currentColor: '',
			colors: [
				'red white--text',
				'primary white--text',
				'green white--text',
				'secondary white--text',
			]
		}
	},
	computed: {
		darkMode() {
			return this.$store.state.AppStore.darkMode;
		},
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
			const project_id = this.$store.state.AppStore.openedProjectId;
			this.$store.commit('CreateNote', {
				project_id: project_id,
				title: this.title,
				description: this.description,
				category: this.category.tag,
				color: this.currentColor
			});

			// Cleaning up
			this.category = { text: 'TODO', tag: 'todo' };
			this.title = this.description = null;
			this.createNote = false;
		}
	},
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