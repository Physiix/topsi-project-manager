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
import { ProjManager } from '../../../core/ProjectManager';

export default {
	name: 'ProjectSettings',
	data() {
		return {
			items: [
				{
					title: 'New project',
					icon: 'add',
					action: () => this.$store.commit('CreateProjDialog')
				},
				{
					title: 'Export Project',
					icon: 'save',
					action: () => { this.$store.commit('ExportProjDialog') }
				},
				{
					title: 'Import Project',
					icon: 'insert_drive_file',
					action: () => { ProjManager.LoadProject(); }
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