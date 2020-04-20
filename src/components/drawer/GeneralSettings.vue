<template>
  <v-card flat>
    <v-container>
      <v-checkbox
        class="px-1"
        style="padding-left:13px;"
        :label="$lang.Get('darkMode')"
        v-model="darkMode"
      ></v-checkbox>
      <v-checkbox
        class="px-1"
        style="padding-left:13px;"
        :label="$lang.Get('darkenToolbar')"
        v-model="darkenToolbar"
      ></v-checkbox>
      <ColorPicker v-model="color" @text-color-selected="setTextColor"></ColorPicker>
      <LanguageSelection class="px-2" />
    </v-container>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";

@Component({})
export default class extends Vue {
  private color: string = this.$store.getters.appColor;

  set darkMode(value) {
    this.$store.commit("SetDarkMode", value);
  }

  get darkMode() {
    return this.$store.state.AppStore.darkMode;
  }

  set darkenToolbar(value) {
    this.$store.commit("ToggleDarkenToolbar");
  }

  get darkenToolbar() {
    return this.$store.state.AppStore.darkenToolbar;
  }

  private setTextColor(color: string) {
    console.log(color);
    this.$store.commit("SetTextColor", color);
  }

  @Watch("color")
  private colorUpdated() {
    this.$store.commit("SetAppColor", this.color);
  }
}
</script>

<style lang="scss" scoped></style>

<style scoped></style>
