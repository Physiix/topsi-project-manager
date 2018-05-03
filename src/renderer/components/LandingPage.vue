<template>
	<div>
		<Drawer />
		<v-content>
			<Projects v-if="displayProjects" />
			<Notes v-else />
		</v-content>
	</div>

</template>

<script>
import Notes from './notes/Notes.vue'
import Drawer from './drawer/Drawer.vue'
import Projects from './projects/Projects.vue'
export default {
	name: 'landing-page',
	components: {
		Projects,
		Notes,
		Drawer
	},
	computed: {
		displayProjects() {
			return !this.$store.getters.IsProjectOpened;
		}
	},
	methods: {
	}
}
</script>

<style>
</style>
