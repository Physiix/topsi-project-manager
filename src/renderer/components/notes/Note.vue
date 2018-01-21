<template>
	<div>
		<v-card class="ma-2">
			<!-- <v-layout>
				<v-spacer></v-spacer>
				<v-btn class="color_btn red lighten-1 elevation-0"></v-btn>
				<v-btn class="color_btn blue elevation-0"></v-btn>
				<v-btn class="color_btn green elevation-0"></v-btn>
			</v-layout> -->
			<v-card-title>{{note.title}}</v-card-title>
			<v-divider></v-divider>
			<v-card-text>{{note.description}}</v-card-text>
		</v-card>
	</div>
</template>
<script>

export default {
	name: 'Note',
	components: {

	},
	props: {
		note: Object
	},
	data() {
		return {

		}
	},
	computed: {
	},
	methods: {

	},
}
</script>

<style scoped>
.color_btn{
	border-radius: 0;
	min-width: 10px !important;
	max-height: 10px !important;
	margin: 0;
}
</style>