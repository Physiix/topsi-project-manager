<template>
  <ProjectDialogContent
    enable-delete
    :project="project"
    v-on:close="updateProject = false"
    v-on:accept="updateProject"
  />
</template>
<script>
import ProjectDialogContent from "./ProjectDialogContent.vue";

export default {
  name: "UpdateProjectDialog",
  components: {
    ProjectDialogContent
  },
  computed: {
    updateProject: {
      set(value) {
        this.$store.dispatch("ToggleDialog", "updateProject");
      },
      get() {
        return this.$store.getters.isUpdateProject;
      }
    },

    project() {
      const project = { ...this.$store.getters.currentProject(this) };
      project.categories = project.categories.map(category => category.title);
      return project;
    }
  },
  methods: {
    /**
     * Handle the 'Save' button click.
     */
    updateProject(data) {
      // Update the project.
      this.$store.dispatch("updateProject", {
        id: this.project.id,
        title: data.title,
        description: data.description,
        categories: data.categories,
        customPath: data.customPath
      });

      this.updateProject = false;
    }
  }
};
</script>

<style scoped></style>
