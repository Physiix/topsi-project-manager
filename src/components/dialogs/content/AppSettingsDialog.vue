<template>
  <v-card class="app-settings">
    <v-tabs v-model="active" centered>
      <v-tab v-for="(tab, index) in tabs" :key="index" :href="`#tab-${index}`" :ripple="false">
        {{ tab }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="active">
      <v-tab-item v-for="(tab, index) in tabs" :key="index" :value="`tab-${index}`">
        <GeneralSettings v-if="tab == $lang.Get('general')" class="item" />
        <div v-if="tab == $lang.Get('about')" class="item">
          <v-card flat>
            <v-card-text
              class="justify-center text-xs-center"
              v-html="$lang.Get('aboutContent')"
            ></v-card-text>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>
    <div class="app-settings__actions">
      <v-btn text :color="color" @click="close">Close</v-btn>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import GeneralSettings from "../../drawer/GeneralSettings.vue";
import { CreateElement } from "vue/types/umd";

GeneralSettings;

@Component({
  components: {
    GeneralSettings
  }
})
export default class extends Vue {
  private tabs: string[] = [(<any>this).$lang.Get("general"), (<any>this).$lang.Get("about")];
  private active: string = "tab-0";

  private get color() {
    return this.$store.getters.appColor;
  }

  private close() {
    this.$store.dispatch("CloseDialog");
  }
}
</script>

<style lang="scss" scoped>
.app-settings {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;

  &__actions {
    padding: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
