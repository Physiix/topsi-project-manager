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
	name: 'ProjectSettings',
	components: {

	},
	props: {

	},
	data() {
		return {
			items: [
				{
					title: 'New project',
					icon: 'add',
					action: () => this.$store.commit('CreateProjDialog')
				},
				{
					title: 'Upload Database',
					icon: 'sync',
					action: () => this.$store.dispatch('UploadGist')
				},
				{
					title: 'Download Database',
					icon: 'cloud_download',
					action: () => this.$store.dispatch('DownloadGist')
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

	},
}
</script>

<style scoped>

</style>