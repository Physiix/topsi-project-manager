<template>
	<v-card>
		<v-container>
			<v-text-field v-model="username" label="Username"></v-text-field>
			<v-text-field v-model="token" label="Authentication token"></v-text-field>
			<v-text-field v-model="gist_id" label="Gist ID"></v-text-field>
		</v-container>
	</v-card>
</template>
<script>

export default {
	name: 'GitSettings',
	computed: {
		username: {
			set(value) {
				this.$store.commit('SetUsername', value);
			},

			get() {
				return this.$store.state.AppStore.gitUserInfo.username;
			}
		},

		token: {
			set(value) {
				this.$store.commit('SetToken', value);
			},

			get() {
				return this.$store.state.AppStore.gitUserInfo.repository_token;
			}
		},

		gist_id: {
			set(value) {
				this.$store.commit('SetGistId', value);
			},

			get() {
				return this.$store.state.AppStore.gitUserInfo.gist_id;
			}
		}
	},
}
</script>

<style scoped>

</style>