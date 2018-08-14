<template>
	<div>
		<!-- <v-navigation-drawer app permanent :width="drawerWidth"> -->
		<!-- <Title /> -->
		<!-- <v-divider></v-divider> -->
		<Content />
		<!-- </v-navigation-drawer> -->
	</div>
</template>
<script>
import Content from './Content.vue'
import Title from './Title.vue'

export default {
	name: 'Drawer',
	components: {
		Title,
		Content
	},
	computed: {
		drawerWidth() {
			return this.$store.state.AppStore.drawerWidth;
		},
	},
}
</script>

<style scoped>

</style>