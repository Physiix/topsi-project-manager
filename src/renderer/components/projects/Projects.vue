<template>
	<div>
		<v-layout row wrap>
			<v-flex xs3 v-for="i in 10" :key="i">
				<Project :project="{}" />
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
import Project from './Project'

export default {
	name: 'Projects',
	components: {
		Project
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