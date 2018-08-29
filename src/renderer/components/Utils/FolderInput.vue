<template>
	<v-toolbar class="mx-2 pa-2 px-4 transparent elevation-0">
		<v-text-field :label="label?label:'Folder'" class="pt-2 mt-1" light v-model="folder" solo></v-text-field>
		<div>
			<v-icon v-if="folderExists" color="success">
				check
			</v-icon>
			<v-icon v-else color="error">
				close
			</v-icon>
		</div>
		<v-btn @click="OpenDialog" class="elevation-5 justify-right text-xs-right" color="primary" style="border-radius:0;">
			{{this.$lang.Get('browse')}}
		</v-btn>
	</v-toolbar>
</template>
<script>
const fs = require('fs');
const os = require('os');
const path = require('path');
const electron = require('electron');

export default {
	name: 'FolderInput',
	props: {
		value: String,
		label: String,
	},
	data() {
		return {
			folder: this.value
		}
	},
	watch: {
		folder(value) {
			this.$emit('input', this.folder);
		}
	},
	computed: {
		folderExists() {
			return fs.existsSync(this.folder);
		}
	},
	methods: {
		OpenDialog() {
			const dialog = electron.remote.dialog;
			// Get the selected folder by the user.
			this.folder = dialog.showOpenDialog(electron.remote.getCurrentWindow(), {
				properties: [
					'openDirectory',
					'createFolder'
				]
			});

			// Adds the separator at the end.
			this.folder += path.sep;
		},
	}
}
</script>

<style scoped>

</style>