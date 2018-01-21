<template>
	<div>
		<v-toolbar flat color="secondary">
			<v-list>
				<v-list-tile @click="DisplayProjects">
					<v-list-tile-title class="title">
						Project Manager
					</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-toolbar>
	</div>
</template>
<script>

export default {
	name: 'Title',
	methods: {
		DisplayProjects() {
			this.$store.commit('OpenProject', -1);
		}
	},
}
</script>

<style scoped>

</style>