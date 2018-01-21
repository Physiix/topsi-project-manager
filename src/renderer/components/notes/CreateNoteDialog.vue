<template>
	<div>
		<v-dialog v-model="createNote" max-width="300">
			<v-card>
				<v-card-title>New Note</v-card-title>
				<v-container>
					<v-text-field label="Title" v-model="title"></v-text-field>
					<v-text-field label="Description" v-model="description"></v-text-field>
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
			title: '',
			description: ''
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

		}
	},
}
</script>

<style scoped>

</style>