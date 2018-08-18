<template>
	<div id="container">
		<div id="side" :class="this.$store.getters.appColor">
			<Drawer />
		</div>
		<div id="content">
			<Projects v-if="displayProjects" />
			<Notes v-else />
		</div>
		<!-- The titlebar needs to be on top of the other divs, so it's the last one to be rendered. -->
		<Titlebar />
	</div>

</template>

<script>
import { AppManager } from '../../core/ApplicationManager'

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
	mounted() {
		AppManager.SetupLandingPage('container', 'side', 'content');
	}
}
</script>

<style>

#side{
	overflow-y: auto;
	overflow-x: hidden;
}

#content{
	overflow-y: auto;
	overflow-x: hidden;
}

</style>
