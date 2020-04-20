<template>
  <div class="note-settings">
    <v-list dense class="pt-0 transparent" dark>
      <v-list-item
        class="note-settings__item"
        v-for="item in items"
        :key="item.title"
        @click="item.action()"
      >
        <v-icon>
          {{ item.icon }}
        </v-icon>
      </v-list-item>
      <!-- Note yet ready	 -->
      <!-- <MilestonesSettings /> -->
      <TagsSettings />
      <v-divider></v-divider>
    </v-list>
    <div style="width:25px;margin-left:13px;cursor:pointer;position:absolute;bottom:0;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" transform="rotate(180)">
        <title>DockBottom_16x</title>
        <path class="icon-vs-bg" d="M1,2V14H15V2ZM14,9H2V3H14Z" fill="#fff" />
      </svg>
    </div>
  </div>
</template>
<script>
import MilestonesSettings from "./MilestonesSettings.vue";
import TagsSettings from "./TagsSettings.vue";
import {
  mdiArrowLeft,
  mdiMagnify,
  mdiPlus,
  mdiCircleEditOutline,
  mdiFormatListNumberedRtl
} from "@mdi/js";
import { Dialogs } from "../../../core/Constants";

export default {
  name: "NotesSettings",
  components: {
    TagsSettings,
    MilestonesSettings
  },
  props: {},
  data() {
    return {
      items: [
        {
          icon: mdiArrowLeft,
          title: "",
          hint: this.$lang.Get("backToProjects"),
          action: () => {
            // Back to the main menu.
            this.$store.dispatch("OpenProject", null);
          }
        },
        {
          icon: mdiMagnify,
          title: "Search",
          hint: this.$lang.Get("searchInNotes"),
          action: () => {
            this.$store.dispatch("ToggleDialog", "searchDialog");
          }
        },
        {
          icon: mdiPlus,
          title: "New Note",
          hint: this.$lang.Get("addNewNote"),
          style: "margin-left:-2px;",
          action: () => this.$store.dispatch("ToggleDialog", Dialogs.CreateNote)
        },
        {
          icon: mdiCircleEditOutline,
          title: "Edit Project",
          class: "pr-2",
          hint: this.$lang.Get("editProject"),
          action: () => this.$store.dispatch("ToggleDialog", "updateProject")
        },
        {
          icon: mdiFormatListNumberedRtl,
          title: "Milestones",
          style: "margin-left:-2px;",
          hint: this.$lang.Get("milestones"),
          action: () => this.$store.dispatch("ToggleDialog", "milestonesList")
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.note-settings {
  &__item {
    margin-left: -3px;
  }
}
</style>
