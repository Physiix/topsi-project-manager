<template>
  <Dialog
    v-if="showSettings"
    width="500"
    @close="showSettings = false"
    disable-accept
    :cancel-text="$lang.Get('close')"
  >
    <v-tabs v-model="active" centered>
      <v-tab
        v-for="(tab, index) in tabs"
        :key="index"
        :href="`#tab-${index}`"
        :ripple="false"
      >{{ tab }}</v-tab>
    </v-tabs>
    <v-tabs-items v-model="active">
      <v-tab-item v-for="(tab, index) in tabs" :key="index" :value="`tab-${index}`">
        <GeneralSettings v-if="tab == $lang.Get('general')" class="item" />
        <div v-if="tab == $lang.Get('about')" class="item">
          <v-card class="elevation-0">
            <v-card-text class="justify-center text-xs-center" v-html="$lang.Get('aboutContent')"></v-card-text>
          </v-card>
        </div>
      </v-tab-item>
    </v-tabs-items>
  </Dialog>
</template>
<script>
import GeneralSettings from "./GeneralSettings.vue";

export default {
  name: "Settings",
  components: {
    GeneralSettings
  },
  data() {
    return {
      tabs: [this.$lang.Get("general"), this.$lang.Get("about")],
      active: "tab-0"
    };
  },
  computed: {
    showSettings: {
      set(value) {
        this.$store.dispatch("ToggleDialog", "showSettings");
      },

      get() {
        return false;
      }
    }
  }
};
</script>

<style scoped>
.item {
  min-height: 300px;
}
</style>
