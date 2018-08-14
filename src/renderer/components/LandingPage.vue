<template>
	<div>
		<!-- <v-toolbar app class="red" style="margin-top:30px;" height="48" dark>
			<v-toolbar-side-icon></v-toolbar-side-icon>
		</v-toolbar> -->
		<!-- <Drawer /> -->
		<v-content style="margin-top:30px" class="my-5">
			<Projects v-if="displayProjects" />
			<Notes v-else />
		</v-content>
		<!-- The titlebar needs to be on top of the other divs, so it's the last one to be rendered. -->
		<Titlebar />
	</div>

</template>

<script>
import Titlebar from './Titlebar.vue'
import Notes from './notes/Notes.vue'
import Drawer from './drawer/Drawer.vue'
import Projects from './projects/Projects.vue'
export default {
	name: 'landing-page',
	components: {
		Titlebar,
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
body{
	
}
</style>
