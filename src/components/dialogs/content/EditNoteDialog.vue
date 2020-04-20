<template>
  <v-card class="edit-note">
    <Title content="Edit Note" />

    <div class="edit-note__container">
      <v-text-field v-model="input.title" :value="note.title"></v-text-field>

      <v-card>
        <div id="toolbar"></div>
        <div id="editor" style="min-height: 180px;"></div>
      </v-card>

      <div class="edit-note__actions">
        <v-btn text :color="color" @click="save">Update</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Quill from "quill";
import Component from "vue-class-component";
import Title from "@/components/dialogs/utils/Title.vue";
import { Note } from "@/core/Data";

class Input {
  public title: string = "";
}

@Component({
  components: {
    Title
  },
  watch: {
    note() {
      this.$forceUpdate();
    }
  }
})
export default class extends Vue {
  private editor: any = null;
  private input: Input = new Input();

  private get note(): Note {
    return this.$store.getters.editedNote;
  }

  private get color(): string {
    return this.$store.getters.appColor;
  }

  private fillInputs() {
    this.input.title = this.note.title;

    const descEl = document.getElementsByClassName("ql-editor")[0];
    if (descEl) {
      descEl.innerHTML = this.note.description;
    }
  }

  private save() {
    const updatedNote = new Note(
      this.note.projectId,
      this.input.title,
      document.getElementsByClassName("ql-editor")[0].innerHTML,
      this.note.category,
      this.note.color,
      this.note.milestoneId,
      this.note.tags
    );
    updatedNote.id = this.note.id;

    this.$store.dispatch("UpdateNote", updatedNote);
    this.$store.dispatch("CloseDialog");
  }

  private updated() {
    this.fillInputs();
  }

  private mounted() {
    this.fillInputs();

    if (document.querySelector("#editor")) {
      // Setup QUILL
      const options = {
        modules: {
          toolbar: [
            [{ size: ["small", false, "large", "huge"] }], // custom dropdown
            ["bold", "italic", "underline", "strike"], // toggled buttons
            [{ header: 1 }, { header: 2 }], // custom button values
            [{ list: "ordered" }, { list: "bullet" }],
            [{ direction: "rtl" }], // text direction
            [{ color: [] }, { background: [] }], // dropdown with defaults from theme
            [{ align: [] }],
            ["clean"] // remove formatting button
          ]
        },
        placeholder: "Description of your project...",
        theme: "snow" // or 'bubble'
      };
      this.editor = new Quill("#editor", options);
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-note {
  &__container {
    padding: 15px;
  }

  &__actions {
    margin-top: 25px;
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
