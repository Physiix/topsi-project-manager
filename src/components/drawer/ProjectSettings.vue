<template>
  <v-list dense class="pt-0 transparent" dark>
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
<script>
import ProjectManager from "@/core/ProjectManager";
import { mdiPlus, mdiDatabaseExport, mdiDatabaseImport, mdiCog } from "@mdi/js";

export default {
  name: "ProjectSettings",
  data() {
    return {
      items: [
        {
          title: this.$lang.Get("newProject"),
          icon: mdiPlus,
          action: () => this.$store.dispatch("ToggleDialog", "createProject")
        },
        {
          title: this.$lang.Get("exportProject"),
          icon: mdiDatabaseExport,
          action: () => {
            this.$store.dispatch("ToggleDialog", "exportProject");
          }
        },
        {
          title: this.$lang.Get("importProject"),
          icon: mdiDatabaseImport,
          action: () => {
            ProjectManager.LoadProject();
          }
        },
        // {
        // 	title: 'Upload Database',
        // 	icon: 'sync',
        // 	action: () => this.$store.dispatch('UploadGist')
        // },
        // {
        // 	title: 'Download Database',
        // 	icon: 'cloud_download',
        // 	action: () => this.$store.dispatch('DownloadGist')
        // },
        {
          title: this.$lang.Get("settings"),
          icon: mdiCog,
          action: () => {
            this.$store.dispatch("ToggleDialog", "showSettings");
          }
        }
      ]
    };
  },
  computed: {},
  methods: {}
};
</script>

<style scoped></style>
