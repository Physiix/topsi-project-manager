<template>
	<div>
		<v-list-tile v-for="item in items" :key="item.title" @click="item.action()">
			<v-list-tile-action>
				<v-icon>{{ item.icon }}</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>{{ item.title }}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</div>
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