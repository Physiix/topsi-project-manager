<template>
	<div>
		<v-navigation-drawer fixed app permanent width="200">
			<Title />
			<v-divider></v-divider>
			<Content />
		</v-navigation-drawer>
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
	props: {

	},
	data() {
		return {

		}
	},
	computed: {

	},
	methods: {

	},
}
</script>

<style scoped>

</style>