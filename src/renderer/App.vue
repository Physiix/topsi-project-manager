<template>
	<div id="app">
		<v-app :dark="darkMode">
			<router-view></router-view>
		</v-app>
	</div>
</template>

<script>
require('../../node_modules/vuetify/dist/vuetify.min.css');
require('../../node_modules/font-awesome/css/font-awesome.min.css')
require('../../node_modules/quill/dist/quill.core.css')
require('../../node_modules/quill/dist/quill.snow.css')

export default {
	name: 'project_manager',
	computed: {
		darkMode() {
			return this.$store.state.AppStore.darkMode;
		}
	},
	created() {
		this.$lang.SetCurrentLang(this.$store.getters.selectedLanguage);
	}
}
</script>

<style>
@import '../styles/googleapi.css';
  /* CSS */
body::-webkit-scrollbar {
	display: none;
}
::-webkit-scrollbar {
	width: 6px;
	height: 10px;
}

::-webkit-scrollbar-thumb{
	border-radius: 10px;
}

::-webkit-scrollbar-track {
	background: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-thumb {
	background: #666;
}
</style>
