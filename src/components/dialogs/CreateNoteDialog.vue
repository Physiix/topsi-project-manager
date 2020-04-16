<template>
  <NoteDialogContent :note="note" v-on:close="close" v-on:accept="createNote" />
</template>
<script>
import NoteDialogContent from "./NoteDialogContent.vue";

export default {
  name: "CreateNoteDialog",
  components: {
    NoteDialogContent
  },
  computed: {
    createdNote: {
      set(value) {
        this.$store.dispatch("ToggleDialog", "createNote");
      },

      get() {
        return this.$store.state.AppStore.dialogs.createNote;
      }
    },

    project() {
      const id = this.$store.state.AppStore.openedProjectId;
      return this.$store.getters.getProjectById(id);
    },

    note() {
      return {
        title: "",
        description: "",
        category: { text: "TODO", tag: "todo" },
        tags: [],
        milestoneId: this.project.selectedMilestoneId
      };
    }
  },
  methods: {
    createNote(data) {
      // Create the note
      this.$store.dispatch("CreateNote", {
        project_id: this.project.id,
        title: data.title,
        description: data.description,
        category: data.category,
        color: data.color,
        milestoneId: data.milestoneId,
        tags: data.tags
      });
      this.createdNote = false;
    },

    close() {
      this.createdNote = false;
    }
  }
};
</script>

<style scoped>
.color_item {
  min-width: 40px !important;
  max-width: 40px !important;
  max-height: 15px !important;
  border-radius: 0;
  margin: 0 0 0 0;
}
</style>
