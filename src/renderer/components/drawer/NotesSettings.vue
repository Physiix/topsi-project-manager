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
		<v-list-tile v-for="i in 20" :key="i" @click="">
			<v-list-tile-content>
				<v-list-tile-title>{{i}}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</v-list>
</template>
<script>

export default {
	name: 'NotesSettings',
	components: {

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
				{
					icon: 'edit',
					title: 'Edit Mode'
				}
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