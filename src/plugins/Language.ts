import { LangData } from "./Lang";

class Language {
  install(Vue: any, options: any) {
    Vue.prototype.$lang = {
      context: null,
      lang: "en",

      Get(key: string) {
        //@ts-ignore
        return LangData[this.lang][key];
      },

      SetCurrentLang(lang: string) {
        this.lang = lang;
      },

      GetLanguages() {
        return Object.keys(LangData);
      }
    };
  }
}

export default new Language();
