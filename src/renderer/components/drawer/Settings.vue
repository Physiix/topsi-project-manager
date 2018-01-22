<template>
	<div>
		<v-dialog v-model="showSettings" max-width="300">
			<v-card>
				<v-card-text>Settings</v-card-text>
				<v-container>
					<v-checkbox label="Dark Mode" v-model="darkMode"></v-checkbox>
				</v-container>
			</v-card>
		</v-dialog>
	</div>
</template>
<script>

export default {
	name: 'Settings',
	components: {

	},
	props: {

	},
	computed: {
		darkMode: {
			set(value) {
				this.$store.commit('SetDarkMode', value);
			},

			get() {
				return this.$store.state.AppStore.darkMode;
			}
		},

		showSettings: {
			set(value) {
				this.$store.commit('ShowSettings', value);
			},

			get() {
				return this.$store.state.AppStore.dialogs.showSettings;
			}
		}
	},
	methods: {

	},
}
</script>

<style scoped>

</style>