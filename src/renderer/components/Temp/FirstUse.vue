<template>
	<div class="text-xs-center">
		<v-dialog v-model="dialog" width="600" persistent>
			<v-card>
				<v-card-title class="headline justify-center" dark primary-title>
					Welcome to Project Manager
				</v-card-title>

				<v-card-text class="text-xs-center">
					Since this is the first time you're using this application, please setup the next default values to be used by the application. <br/> <br/> All the settings can be
					<strong>modified </strong> at any time.
				</v-card-text>

				<v-divider class="py-4"></v-divider>
				<v-card-title>
					Setup the default folder to store your projects.
					<v-layout row>
						<v-flex xs8>
							<v-layout row>
								<v-text-field class="pt-2 mt-1" value="path/to/default/folder" v-model="defaultFolder"></v-text-field>
								<v-icon v-if="folderExists" color="success" class="mt-3">
									check
								</v-icon>
								<v-icon v-else color="error" class="mt-3">
									close
								</v-icon>
							</v-layout>
						</v-flex>
						<v-flex xs4>
							<v-btn @click="OpenDialog" class="ml-5 justify-right text-xs-right" flat>
								Browse
							</v-btn>
						</v-flex>
					</v-layout>
				</v-card-title>
				<v-card-title class="pa-0">
					<v-card-text>Setup the default application color</v-card-text>
					<ColorPicker width="600" padding="10" v-on:color-selected="SelectColor"></ColorPicker>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" flat @click="Done">
						Done
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>
const fs = require('fs');
const os = require('os');
const path = require('path');
const electron = require('electron');

export default {
	name: 'FirstUse',
	data() {
		return {
			defaultFolder: null,
			dialog: true,
		}
	},
	computed: {
		folderExists() {
			return fs.existsSync(this.defaultFolder);
		}
	},
	methods: {
		SelectColor(color) {
			this.$store.commit('SetAppColor', color);
		},

		OpenDialog() {
			const dialog = electron.remote.dialog;
			// Get the selected folder by the user.
			this.defaultFolder = dialog.showOpenDialog(electron.remote.getCurrentWindow(), {
				properties: [
					'openDirectory',
					'createFolder'
				]
			});

			// Adds the separator at the end.
			this.defaultFolder += path.sep;
		},

		Done() {
			if (!this.folderExists) return;
			this.$store.commit('SetupApplication', {
				defaultFolder: this.defaultFolder,
			});
			this.dialog = false;
		}
	},

	mounted() {
		this.defaultFolder = path.join(os.homedir(), 'Projects');
	}
}
</script>

<style scoped>

</style>


