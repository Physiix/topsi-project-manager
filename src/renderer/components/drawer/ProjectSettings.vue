<template>
	<v-list dense class="pt-0 transparent" dark>
		<v-list-tile v-for="item in items" :key="item.title" @click="item.action()">
			<v-list-tile-action>
				<v-icon>{{ item.icon }}</v-icon>
			</v-list-tile-action>
			<v-list-tile-content>
				<v-list-tile-title>{{ item.title }}</v-list-tile-title>
			</v-list-tile-content>
		</v-list-tile>
	</v-list>
</template>
<script>
import ProjectManager from '../../../core/ProjectManager';

export default {
	name: 'ProjectSettings',
	data() {
		return {
			items: [
				{
					title: 'New project',
					icon: 'add',
					action: () => this.$store.dispatch('ToggleDialog', 'createProject')
				},
				{
					title: 'Export Project',
					icon: 'save',
					action: () => { this.$store.dispatch('ToggleDialog', 'exportProject') }
				},
				{
					title: 'Import Project',
					icon: 'insert_drive_file',
					action: () => { ProjectManager.LoadProject(); }
				},
				// {
				// 	title: 'Upload Database',
				// 	icon: 'sync',
				// 	action: () => this.$store.dispatch('UploadGist')
				// },
				// {
				// 	title: 'Download Database',
				// 	icon: 'cloud_download',
				// 	action: () => this.$store.dispatch('DownloadGist')
				// },
				{
					title: 'Settings',
					icon: 'settings',
					action: () => this.$store.dispatch('ToggleDialog', 'showSettings')
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