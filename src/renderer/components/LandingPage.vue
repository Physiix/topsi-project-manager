<template>
	<div id="container">
		<div id="side" :class="this.$store.getters.appColor">
			<Drawer />
		</div>
		<div id="content">
			<SearchBar v-if="showSearch" />
			<FirstUse v-if="firstTimeUse"></FirstUse>
			<Projects v-else-if="displayProjects" />
			<Notes v-else/>
		</div>
		<!-- The titlebar needs to be on top of the other divs, so it's the last one to be rendered. -->
		<Titlebar />
	</div>

</template>

<script>
import { AppManager } from '../../core/ApplicationManager'
import { Inputs } from '../../core/InputManager'

import Titlebar from './Titlebar.vue'
import Notes from './notes/Notes.vue'
import Drawer from './drawer/Drawer.vue'
import Projects from './projects/Projects.vue'
import FirstUse from './Temp/FirstUse.vue'
import SearchBar from './SearchBar.vue'

export default {
	name: 'landing-page',
	components: {
		Titlebar,
		FirstUse,
		Projects,
		Notes,
		Drawer,
		SearchBar
	},
	computed: {
		displayProjects() {
			return !this.$store.getters.IsProjectOpened;
		},

		firstTimeUse() {
			return this.$store.getters.firstTimeUse;
		},

		showSearch() {
			return this.$store.getters.isShowSearch;
		}
	},
	methods: {
		KeyUp(event) {
			console.log(event);
		}
	},
	mounted() {
		AppManager.SetupLandingPage('container', 'side', 'content');
		Inputs.Initialize(this);
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
