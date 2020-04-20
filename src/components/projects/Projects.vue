<template>
  <div class="app-projects">
    <v-layout row wrap>
      <v-flex offset-xs2 xs8 v-for="(project, i) in projects" :key="i">
        <Project :project="project" />
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
import Project from "./Project";
import AppManager from "@/core/ApplicationManager";

export default {
  name: "Projects",
  components: {
    Project
  },
  computed: {
    projects() {
      return this.$store.state.ProjectsStore.projects;
    },
    color() {
      if (this.$store.getters.isDarkMode) return "";
      return "grey lighten-2";
    },

    createProjectDialog() {
      return this.$store.state.AppStore.dialogs.createProject;
    }
  },
  mounted() {
    // Update the projects list.
    this.$store.dispatch("RetrieveProjects");
    AppManager.setupProjectsPage("container");
  }
};
</script>

<style lang="scss" scoped>
$grey-lighten-3: #eeeeee;
.app-projects {
  width: 100%;
  height: 100%;
  background: $grey-lighten-3;
}
</style>
