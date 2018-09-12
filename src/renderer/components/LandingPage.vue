<template>
	<div id="container">
		<div id="side" :class="this.$store.getters.appColor">
			<Drawer />
		</div>
		<div id="content">
			<SearchBar v-if="showSearch" />
			<Helper v-if="showHelper" />
			<FirstUse v-if="firstTimeUse"></FirstUse>
			<Projects v-else-if="displayProjects" />
			<Notes v-else/>
		</div>
		<!-- The titlebar needs to be on top of the other divs, so it's the last one to be rendered. -->
		<Titlebar v-if="!macos" />
	</div>

</template>

<script>
import Helper from './Helper.vue'
import AppManager from '../../core/ApplicationManager'
import InputManager from '../../core/InputManager'

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
		SearchBar,
		Helper
	},
	computed: {
		displayProjects() {
			return !this.$store.getters.isProjectOpened;
		},

		firstTimeUse() {
			return this.$store.getters.isFirstTimeUse;
		},

		showSearch() {
			return this.$store.getters.isShowSearch;
		},

		showHelper() {
			return this.$store.getters.isShowHelper;
		},

		macos() {
			return this.$store.getters.isMac;
		}
	},
	methods: {
		KeyUp(event) {
			console.log(event);
		}
	},
	mounted() {
		AppManager.SetupLandingPage((this.macos ? 0 : 30), 'container', 'side', 'content');
		InputManager.Initialize(this);
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
