<template>
  <div id="container">
    <content-dialog-vue />
    <div class="landing-page__dialogs">
      <component v-if="dialogEnabled" :is="currentDialog" />
    </div>
    <div id="side" :style="{ backgroundColor: color, color: textColor }">
      <Drawer />
    </div>
    <div id="content">
      <SearchBar v-if="showSearch" />
      <Helper v-if="showHelper" />
      <FirstUse v-if="firstTimeUse"></FirstUse>
      <Projects v-else-if="displayProjects" />
      <Notes v-else />
    </div>
    <!-- The titlebar needs to be on top of the other divs, so it's the last one to be rendered. -->
    <Titlebar v-if="!macos" />
  </div>
</template>

<script>
import Helper from "./Helper.vue";
import AppManager from "@/core/ApplicationManager";
import InputManager from "@/core/InputManager";

import Titlebar from "./Titlebar.vue";
import Notes from "./notes/Notes.vue";
import Drawer from "./drawer/Drawer.vue";
import Projects from "./projects/Projects.vue";
import FirstUse from "./Temp/FirstUse.vue";
import SearchBar from "./SearchBar.vue";
import ContentDialogVue from "./dialogs/ContentDialog.vue";

export default {
  name: "landing-page",
  components: {
    Titlebar,
    FirstUse,
    Projects,
    Notes,
    Drawer,
    SearchBar,
    Helper,
    ContentDialogVue
  },
  computed: {
    displayProjects() {
      return !this.$store.getters.isProjectOpened;
    },

    firstTimeUse() {
      return this.$store.getters.isFirstTimeUse;
    },

    color() {
      return this.$store.getters.appColor;
    },

    textColor() {
      return this.$store.getters.textColor;
    },

    showSearch() {
      return this.$store.getters.isShowSearch;
    },

    showHelper() {
      return this.$store.getters.isShowHelper;
    },

    macos() {
      return this.$store.getters.isMac;
    },

    dialogEnabled() {
      return false;
    },

    currentDialog() {
      return "dialog-create-project";
    }
  },
  methods: {
    keyUp(event) {}
  },
  mounted() {
    AppManager.setupLandingPage(
      this.macos ? 0 : 30,
      "container",
      "side",
      "content"
    );
    InputManager.initialize(this);
  }
};
</script>

<style lang="scss" scoped>
.landing-page {
  &__dialogs {
    position: fixed;
    width: 100vw;
    height: 100vh;
  }
}

#side {
  overflow-y: auto;
  overflow-x: hidden;
}

#content {
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
