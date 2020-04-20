<template>
  <v-list dense class="pt-0 transparent" :dark="textColor === '#FFF'">
    <v-list-item v-for="item in items" :key="item.title" @click="item.action()">
      <v-list-item-action>
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>
<script lang="ts">
import ProjectManager from "@/core/ProjectManager";
import { mdiPlus, mdiDatabaseExport, mdiDatabaseImport, mdiCog } from "@mdi/js";
import { Dialogs } from "../../core/Constants";

import Vue from "vue";
export default Vue.extend({
  name: "ProjectSettings",
  data() {
    return {
      items: [
        {
          title: (<any>this).$lang.Get("newProject"),
          icon: mdiPlus,
          action: () =>
            this.$store.dispatch("ToggleDialog", Dialogs.CreateProject)
        },
        {
          title: (<any>this).$lang.Get("exportProject"),
          icon: mdiDatabaseExport,
          action: () => {
            this.$store.dispatch("ToggleDialog", Dialogs.ExportProject);
          }
        },
        {
          title: (<any>this).$lang.Get("importProject"),
          icon: mdiDatabaseImport,
          action: () => {
            ProjectManager.loadProject();
          }
        },
        {
          title: (<any>this).$lang.Get("settings"),
          icon: mdiCog,
          action: () => {
            this.$store.dispatch("ToggleDialog", Dialogs.AppSettings);
          }
        }
      ]
    };
  },
  computed: {
    textColor() {
      return this.$store.getters.textColor;
    }
  }
});
</script>

<style scoped></style>
