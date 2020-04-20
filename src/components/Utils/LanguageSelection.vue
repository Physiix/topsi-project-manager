<template>
  <v-select
    class="language-selection"
    outlined
    dense
    :value="selected"
    @change="select"
    :items="langs"
    :label="$lang.Get('language')"
  ></v-select>
</template>
<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({})
export default class extends Vue {
  private langs: string[] = [];
  private selected!: string;

  private select(language: string) {
    if (language == this.$store.getters.selectedLanguage) return;
    this.$store.dispatch("SetCurrentLanguage", language);
    (<any>this).$lang.SetCurrentLang(language);
    location.reload();
  }

  private created() {
    // this.$lang.SetCurrentLang('en')
    this.langs = (<any>this).$lang.GetLanguages();
    this.selected = this.$store.getters.selectedLanguage;
  }
}
</script>

<style lang="scss" scoped>
.language-selection {
  margin-top: 10px;
}
</style>
