<template>
	<v-card>
		<v-container>
			<v-checkbox label="Dark Mode" v-model="darkMode"></v-checkbox>
			<ColorPicker width="450" padding="20" class="pr-4" v-on:color-selected="SelectColor"></ColorPicker>
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
	methods: {
		SelectColor(color) {
			this.$store.commit('SetAppColor', color);
		}
	}
}
</script>

<style scoped>

</style>