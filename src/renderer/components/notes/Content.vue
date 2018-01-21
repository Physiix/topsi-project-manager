<template>
	<div>
		<v-card class="pa-3" id="title_card">
			{{title}}
		</v-card>

		<v-card v-for="i in 20" :key="i" class="ma-3">
			<v-card-text>test</v-card-text>
		</v-card>
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