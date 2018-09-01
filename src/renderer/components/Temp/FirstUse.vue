<template>
	<div class="text-xs-center">
		<v-dialog v-model="dialog" width="600" persistent>
			<v-card>
				<v-card-title class="headline justify-center" dark primary-title v-html="this.$lang.Get('firstUseWelcome')">
				</v-card-title>

				<v-card-text class="text-xs-center" v-html="this.$lang.Get('firstUseContent')">
				</v-card-text>

				<v-divider class="py-4"></v-divider>
				<v-card-title>
					<p class="ma-0 ml-4">{{this.$lang.Get('firstUseSetupFolder')}}</p>
					<FolderInput v-model="defaultFolder"></FolderInput>
				</v-card-title>
				<v-card-title class="pa-0">
					<v-card-text class="ma-0 ml-4">{{this.$lang.Get('firstUseSetupColor')}}</v-card-text>
					<ColorPicker width="600" padding="10" v-on:color-selected="SelectColor"></ColorPicker>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" flat @click="Done">
						{{this.$lang.Get('done')}}
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
			this.$store.dispatch('SetupApplication', {
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


