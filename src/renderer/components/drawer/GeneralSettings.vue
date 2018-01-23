<template>
	<v-card>
		<v-container>
			<v-checkbox label="Dark Mode" v-model="darkMode"></v-checkbox>
		</v-container>
	</v-card>
</template>
<script>

export default {
	name: 'GeneralSettings',
	data() {
		return {
		}
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
	},
}
</script>

<style scoped>

</style>