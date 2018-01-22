<template>
	<div>
		<Settings />
		<v-list dense class="pt-0">
			<v-list-tile v-for="item in items" :key="item.title" @click="item.action()">
				<v-list-tile-action>
					<v-icon>{{ item.icon }}</v-icon>
				</v-list-tile-action>
				<v-list-tile-content>
					<v-list-tile-title>{{ item.title }}</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>
		</v-list>
	</div>
</template>
<script>
import Settings from './Settings.vue'

export default {
	name: 'Content',
	components: {
		Settings
	},
	props: {

	},
	data() {
		return {
			items: [
				{
					title: 'Create new project',
					icon: 'add',
					action: () => this.$store.commit('CreateProjDialog')
				},
				{
					title: 'Sync Database',
					icon: 'sync'
				},

				{
					title: 'Settings',
					icon: 'settings',
					action: () => this.$store.commit('ShowSettings', true)
				},
			]
		}
	},
	computed: {

	},
	methods: {
		Handle(item) {
			console.log(item.title);
		}
	},
}
</script>

<style scoped>

</style>