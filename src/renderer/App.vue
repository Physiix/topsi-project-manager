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

export default {
	name: 'project_manager',
	computed: {
		darkMode() {
			return this.$store.state.AppStore.darkMode;
		}
	}
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons';
  /* CSS */
body::-webkit-scrollbar {
	display: none;
}
::-webkit-scrollbar {
	width: 5px;
	height: 5px;
}

::-webkit-scrollbar-track {
	background: #ddd;
}

::-webkit-scrollbar-thumb {
	background: #666;
}
</style>
