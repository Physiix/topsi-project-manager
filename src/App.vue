<template>
  <v-app>
    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import LandingPageVue from "./components/LandingPage.vue";
require("@/../node_modules/quill/dist/quill.core.css");
require("@/../node_modules/quill/dist/quill.snow.css");

export default Vue.extend({
  name: "App",

  components: {
    LandingPageVue
  },

  data: () => ({
    //
  })
});
</script>

<style lang="scss">
body::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar {
  width: 6px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  border-radius: 10px;
}

::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0);
}

::-webkit-scrollbar-thumb {
  background: #666;
}
</style>
