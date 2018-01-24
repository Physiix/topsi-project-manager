<template>
	<div>
		<v-dialog v-model="updateNote" max-width="300">
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
					<v-btn flat class="ma-0" @click="updateNote = false">Cancel</v-btn>
					<v-btn flat class="ma-0" @click="UpdateNote">Update</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>

export default {
	name: 'UpdateNoteDialog',
	data() {
		return {
			title: null,
			description: null,
			id: null,
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
		updateNote: {
			set(value) {
				this.$store.commit('UpdateNoteDialog');
			},

			get() {
				return this.$store.state.AppStore.dialogs.updateNote;
			}
		}
	},
	methods: {
		UpdateNote() {
			const project_id = this.$store.state.AppStore.openedProjectId;
			this.$store.commit('UpdateNote', {
				project_id: project_id,
				id: this.id,
				title: this.title,
				description: this.description,
				category: this.category.tag,
				color: this.currentColor
			});

			// Cleaning up
			this.category = { text: 'TODO', tag: 'todo' };
			this.title = this.description = null;
			this.updateNote = false;
		}
	},

	updated() {
		const data = this.$store.state.NotesStore.menu.note;
		// Make sure the edited note isn't invalid.
		if (data == null) return;

		this.id = data.id;
		this.title = data.title;
		this.description = data.description;
		this.currentColor = data.color;
	},

	mounted() {
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