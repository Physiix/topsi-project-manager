<template>
	<div>
		<Drawer />
		<v-content class="px-4">
			<Projects />
		</v-content>
	</div>

</template>

<script>
import Drawer from './drawer/Drawer.vue'
import Projects from './projects/Projects.vue'
export default {
	name: 'landing-page',
	components: {
		Projects,
		Drawer
	},
	methods: {
	}
}
</script>

<style>
</style>
