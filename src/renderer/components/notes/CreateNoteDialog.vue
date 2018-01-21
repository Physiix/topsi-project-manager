<template>
	<div>
		<v-dialog v-model="createNote" max-width="300">
			<v-card>
				<v-card-title>New Note</v-card-title>
				<v-container>
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
			]
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
			const project_id = this.$store.state.AppStore.openedProjectId;
			this.$store.commit('CreateNote', {
				project_id: project_id,
				title: this.title,
				description: this.description,
				category: this.category.tag
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

</style>