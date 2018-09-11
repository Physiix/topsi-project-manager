<template>
	<div>
		<v-select :value="selected" @change="Select" :items="langs" label="Language"></v-select>
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
			if (language == this.$store.getters.getSelectedLanguage) return;
			this.$store.dispatch('SetCurrentLanguage', language);
			this.$lang.SetCurrentLang(language);
			location.reload();
		}
	},
	mounted() {
		// this.$lang.SetCurrentLang('en')
		this.langs = this.$lang.GetLanguages();
		this.selected = this.$store.getters.getSelectedLanguage;
	}
}
</script>

<style scoped>

</style>