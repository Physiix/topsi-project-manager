<template>
  <v-card class="edit-note">
    <Title content="Edit Note" />
    <div class="edit-note__container">
      <v-btn block color="error" @click="deleteNote">DELETE</v-btn>
      <v-text-field v-model="input.title"></v-text-field>
      <v-card>
        <div id="toolbar"></div>
        <div id="editor" style="min-height: 180px;"></div>
      </v-card>
      <div class="edit-note__actions">
        <v-btn text :color="color" @click="save">Update</v-btn>
        <v-btn text @click="close">Close</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { Watch } from "vue-property-decorator";
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
  }
})
export default class extends Vue {
  private editor: any = null;
  private input: Input = new Input();

  get note(): Note {
    return this.$store.getters.editedNote;
  }

  get color(): string {
    return this.$store.getters.appColor;
  }

  @Watch("$store.getters.editedNote")
  update() {
    this.fillInputs();
  }

  private deleteNote() {
    this.$store.dispatch("DeleteNote", this.note);
    this.$store.dispatch("CloseDialog");
  }

  private fillInputs() {
    if (this.note != null) {
      this.input.title = this.note.title;

      document.getElementsByClassName("ql-editor")[0].innerHTML = this.note.description;
    }
  }

  private close() {
    this.$store.commit("SetEditedNote", null);
    this.$store.commit("CloseDialog");
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
    this.close();
  }

  private mounted() {
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
    this.fillInputs();
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
