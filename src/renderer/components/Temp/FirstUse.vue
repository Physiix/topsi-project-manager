<template>
	<div class="text-xs-center">
		<v-dialog v-model="dialog" width="600" persistent>
			<v-card>
				<v-card-title class="headline justify-center" dark primary-title>
					Welcome to Project Manager
				</v-card-title>

				<v-card-text class="text-xs-center">
					<strong>Press CTRL+D at any time to display the help page.</strong> <br /> Since this is the first time you're using this application, please setup the next default values to be used by the application. <br/> <br/> All the settings can be
					<strong>modified </strong> at any time.
				</v-card-text>

				<v-divider class="py-4"></v-divider>
				<v-card-title>
					<p class="ma-0 ml-4">Setup the default folder to store your projects.</p>
					<FolderInput v-model="defaultFolder"></FolderInput>
				</v-card-title>
				<v-card-title class="pa-0">
					<v-card-text class="ma-0 ml-4">Setup the default application color</v-card-text>
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
const os = require('os');

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

	created() {
		this.defaultFolder = os.homedir();
	}
}
</script>

<style scoped>

</style>


