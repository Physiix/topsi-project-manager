<template>
	<div id="container">
		<!-- <v-toolbar app class="red" style="margin-top:30px;" height="48" dark>
			<v-toolbar-side-icon></v-toolbar-side-icon>
		</v-toolbar> -->
		<div id="side" :class="this.$store.getters.appColor">
			<Drawer />
		</div>
		<v-content id="content">
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
	},

	mounted() {
		const resize = () => {
			const container = document.getElementById('container');
			container.style.width = window.innerWidth + 'px';
			container.style.height = window.innerHeight + 'px';
		}
		resize();
		window.addEventListener('resize', resize);
	}
}
</script>

<style>

#container{
	display:grid;
	grid-template-columns: 250px repeat(5, 1fr);
	grid-template-rows: 30px repeat(5, 1fr)
}

#side{
	grid-column: 1 / 2;
	grid-row: 2 / 7;
	overflow-y: auto;
}

#content{
	grid-column: 2 / 7;
	grid-row: 2 / 7;
	overflow-y: auto;
	overflow-x: hidden;
}

</style>
