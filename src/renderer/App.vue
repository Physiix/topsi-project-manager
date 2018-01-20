<template>
	<div id="app">
		<v-app dark>
			<router-view></router-view>
		</v-app>
	</div>
</template>

<script>
require('../../node_modules/vuetify/dist/vuetify.min.css');
require('../../node_modules/font-awesome/css/font-awesome.min.css')
export default {
	name: 'project_manager'
}
</script>

<style>
@import 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons';
  /* CSS */
</style>
