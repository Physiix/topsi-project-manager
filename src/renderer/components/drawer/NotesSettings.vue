<template>
	<v-list dense class="pt-0">
		<v-list-tile v-for="item in items" :key="item.title" @click="item.action()">
			<v-list-tile-action>
				<v-icon>{{ item.icon }}</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>{{ item.title }}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
		<v-divider></v-divider>
		<Timelines />
	</v-list>
</template>
<script>
import Timelines from './Timelines.vue'

export default {
	name: 'NotesSettings',
	components: {
		Timelines
	},
	props: {

	},
	data() {
		return {
			items: [
				{
					icon: 'add',
					title: 'New Note',
					action: () => this.$store.commit('CreateNoteDialog')
				},
				{
					icon: 'add',
					title: 'New Timeline',
					action: () => this.$store.commit('CreateTimelineDialog')
				},
			]
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