<template>
	<v-card>
		<v-container>
			<v-checkbox class="px-1" style="padding-left:13px;" :label="$lang.Get('darkMode')" v-model="darkMode"></v-checkbox>
			<ColorPicker width="450" padding="7" class="" v-on:color-selected="SelectColor"></ColorPicker>
			<LanguageSelection class="px-2" />
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