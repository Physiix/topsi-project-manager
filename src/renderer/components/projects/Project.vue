<template>
	<div>
		<v-card class="ma-2 project_card elevation-3" @click.native="OpenProject">
			<v-card-title>
				Lorem ipsum
			</v-card-title>
			<v-card-text>
				Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia, enim. Quam cupiditate tempore modi soluta voluptatem nihil voluptates id debitis aperiam aspernatur, dignissimos, ducimus reprehenderit velit natus sed vitae autem?
			</v-card-text>
		</v-card>
	</div>
</template>
<script>

export default {
	name: 'Project',
	components: {

	},
	props: {
		project: Object
	},
	data() {
		return {

		}
	},
	computed: {

	},
	methods: {
		OpenProject() {
			console.log("Project");
		}
	},
}
</script>

<style scoped>
.project_card{
	border-radius: 0;
	cursor: pointer;
}
</style>