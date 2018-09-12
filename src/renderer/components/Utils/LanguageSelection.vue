<template>
	<div>
		<v-select :value="selected" @change="Select" :items="langs" :label="$lang.Get('language')"></v-select>
	</div>
</template>
<script>

export default {
	name: 'LanguageSelection',
	data() {
		return {
			langs: [],
			selected: null
		}
	},
	methods: {
		Select(language) {
			if (language == this.$store.getters.selectedLanguage) return;
			this.$store.dispatch('SetCurrentLanguage', language);
			this.$lang.SetCurrentLang(language);
			location.reload();
		}
	},
	mounted() {
		// this.$lang.SetCurrentLang('en')
		this.langs = this.$lang.GetLanguages();
		this.selected = this.$store.getters.selectedLanguage;
	}
}
</script>

<style scoped>

</style>