<template>
  <NoteDialogContent :note="note" v-on:close="close" v-on:accept="updateNote" />
</template>
<script>
import NoteDialogContent from "./NoteDialogContent.vue";

export default {
  name: "UpdateNoteDialog",
  components: {
    NoteDialogContent
  },
  computed: {
    note() {
      return this.$store.state.NotesStore.updatedNote;
    },
    updateNote: {
      set(value) {
        this.$store.dispatch("ToggleDialog", "updateNote");
      },
      get() {
        return this.$store.state.AppStore.dialogs.updateNote;
      }
    }
  },
  methods: {
    updateNote(data) {
      // Update the note
      this.$store.dispatch("UpdateNote", {
        id: data.id,
        project_id: data.projectId,
        title: data.title,
        description: data.description,
        category: data.category,
        color: data.color,
        milestoneId: data.milestoneId,
        tags: data.tags
      });

      // Cleaning up
      this.category = { text: "TODO", tag: "todo" };
      this.title = this.description = null;
      this.updateNote = false;
    },

    close() {
      this.updateNote = false;
    }
  }
};
</script>

<style scoped></style>
