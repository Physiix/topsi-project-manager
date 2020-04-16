<template>
  <div>
    <v-btn fab small bottom right fixed color="primary" @click="addNote" class="elevation-10">
      <v-icon>mdi-add</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  name: "AddNoteButton",
  methods: {
    addNote() {
      this.$store.dispatch("ToggleDialog", "createNote");
    }
  }
};
</script>

<style scoped></style>
