<template>
	<div>
		<main>
			<v-toolbar color="secondary" dark>
				<v-toolbar-title class="subheading" scroll-off-screen>
					{{title}}
				</v-toolbar-title>
			</v-toolbar>
			<v-card v-for="(note, index) in notes" :key="index" class="ma-3">
				<v-card-text>{{note.title}}</v-card-text>
			</v-card>
		</main>
	</div>
</template>
<script>

export default {
	name: 'Content',
	components: {

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
			console.log(this.tag == 'todo' ? 'TODO' : this.tag == 'in_progress' ? 'In Progress' : 'Done');
			return this.tag == 'todo' ? 'TODO' : this.tag == 'in_progress' ? 'In Progress' : 'Done';
		},

		notes() {
			return this.$store.getters.GetNotesById(this.$store.state.AppStore.openedProjectId);
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