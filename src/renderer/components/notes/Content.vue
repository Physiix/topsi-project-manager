<template>
	<div>
		<main>
			<v-toolbar color="secondary" dark>
				<v-toolbar-title class="subheading" scroll-off-screen>
					{{title}}
				</v-toolbar-title>
			</v-toolbar>
			<div v-for="(note, index) in notes" :key="index">
				<Note :note="note" />
			</div>
		</main>
	</div>
</template>
<script>
import Note from './Note.vue'

export default {
	name: 'Content',
	components: {
		Note
	},
	props: {
		tag: String
	},
	data() {
		return {

		}
	},
	computed: {
		title() {
			return this.tag == 'todo' ? 'TODO' : this.tag == 'in_progress' ? 'In Progress' : 'Done';
		},

		notes() {
			return this.$store.getters.GetNotesById(this.$store.state.AppStore.openedProjectId).filter(note => note.category == this.tag);
		}
	},
	methods: {

	},
}
</script>

<style scoped>
#title_card{
	border-radius: 0;
}
</style>