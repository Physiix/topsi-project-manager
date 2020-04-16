<template>
  <ProjectDialogContent
    :project="project"
    v-on:close="createdProject = false"
    v-on:accept="createProject"
  />
</template>
<script>
import ProjectDialogContent from "./ProjectDialogContent.vue";

export default {
  name: "CreateProjectDialog",
  components: {
    ProjectDialogContent
  },
  computed: {
    createdProject: {
      set(value) {
        this.$store.dispatch("ToggleDialog", "createProject");
      },
      get() {
        return this.$store.state.AppStore.dialogs.createProject;
      }
    },

    project() {
      return {
        title: "",
        category: "",
        description: "",
        categories: ["TODO", "In Progress", "Done"]
      };
    }
  },
  methods: {
    /**
     * Handle the 'Save' button click.
     */
    createProject(data) {
      // Create the project.
      this.$store.dispatch("CreateProject", {
        title: data.title,
        description: data.description,
        categories: data.categories,
        customPath: data.customPath
      });
      this.createProject = false;
    }
  }
};
</script>

<style scoped></style>
