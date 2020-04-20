<template>
  <div class="notes" id="notes_container" :class="color">
    <div
      v-for="(category, index) in categories"
      :key="category + index"
      :id="category.tag + '-container'"
      class="notes__container"
    >
      <Content
        :projectId="projectId"
        v-if="!category.folded"
        :id="category.tag + '-content'"
        :category="category"
      />
      <FoldedContent v-else :projectId="projectId" :category="category" />
    </div>
    <MilestonesList />
  </div>
</template>
<script>
import EventManager from "@/core/EventManager";
import AppManager from "@/core/ApplicationManager";

import MilestonesList from "./MilestonesList.vue";
import FoldedContent from "./FoldedContent.vue";
import AddNoteButton from "./AddNoteButton.vue";
import Content from "./Content.vue";
import { Dialogs } from "../../core/Constants";

export default {
  name: "Notes",
  components: {
    Content,
    FoldedContent,
    MilestonesList
  },
  computed: {
    projectId() {
      return this.$store.state.AppStore.openedProjectId;
    },

    project() {
      const id = this.projectId;
      return this.$store.getters.getProjectById(id);
    },

    categories() {
      return this.project.categories;
    },

    color() {
      if (this.$store.getters.isDarkMode) return "";
      return "grey lighten-2";
    },

    macos() {
      return this.$store.getters.isMac;
    }
  },
  mounted() {
    AppManager.setupNotesPage(
      this.macos ? 0 : 30,
      "notes_container",
      "container",
      this.categories
        .filter(category => !category.folded)
        .map(category => category.tag),
      this.categories
        .filter(category => category.folded)
        .map(category => category.tag)
    );
    EventManager.subscribe("update-notes-component", () => {
      this.$nextTick(() => {
        AppManager.setupNotesPage(
          this.macos ? 0 : 30,
          "notes_container",
          "container",
          this.categories
            .filter(category => !category.folded)
            .map(category => category.tag),
          this.categories
            .filter(category => category.folded)
            .map(category => category.tag),
          false
        );
      });
    });
  }
};
</script>

<style lang="scss" scoped>
.notes {
  padding: 0;
  &__container {
    overflow-y: auto;
  }
}
</style>
