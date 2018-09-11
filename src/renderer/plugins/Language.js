import LangData from './Lang'

class Language {
	install(Vue, options) {
		Vue.prototype.$lang = {
			context: null,
			lang: 'en',

			Get(key) {
				return LangData[this.lang][key];
			},

			SetCurrentLang(lang) {
				this.lang = lang;
			},

			GetLanguages() {
				return Object.keys(LangData);
			}
		}
	}
}

export default new Language();