<script lang="ts">
import Vue from "vue";
import Quill from "quill";
import Component from "vue-class-component";
import { Milestone, Project, Category, Note } from "../../../core/Data";
import Title from "../utils/Title.vue";
import { CreateElement } from "vue/types/umd";

// Components

type InputCategory = {
  text: string;
  tag: string;
};

type InputMilestone = {
  text: string;
  id: number;
};

class Input {
  title: string = "";
  tagSearch: string = "";
  selectedTags: string[] = [];
  selectedMilestone!: InputMilestone;
  milestones: InputMilestone[] = [];
  categories: InputCategory[] = [];
  selectedCategory!: InputCategory;
  noteColor: string = "";
  noteTextColor: string = "";
}

@Component({
  props: {
    note: Object
  },
  components: {
    Title
  }
})
export default class extends Vue {
  // Reference to the quill editor
  private editor: any = null;

  // Inputs needed to create a note.
  private input: Input = new Input();

  get project(): Project {
    const id = this.$store.state.AppStore.openedProjectId;
    return this.$store.getters.getProjectById(id);
  }

  get categories(): Category[] {
    return this.project.categories;
  }

  get milestones(): Milestone[] {
    return this.$store.getters.milestones;
  }

  get tagItems() {
    return this.$store.getters.projectTags.map((tag: any) => tag.tag);
  }

  get color() {
    return this.$store.getters.appColor;
  }

  get isDisabled() {
    return this.input.title.length === 0;
  }

  get tags() {
    return this.$store.getters.projectTags;
  }

  private colorSelected(color: string) {
    this.input.noteColor = color;
  }

  private createNote() {
    const projectId = this.$store.state.AppStore.openedProjectId;

    // Getting the selected tags.
    const tags: any[] = [];
    this.input.selectedTags.forEach(tagName =>
      this.tags.forEach((entry: any) => {
        if (entry.tag == tagName) tags.push(entry);
      })
    );

    this.$store.dispatch(
      "CreateNote",
      new Note(
        projectId,
        this.input.title,
        document.getElementsByClassName("ql-editor")[0].innerHTML,
        this.input.selectedCategory.tag,
        this.input.noteColor,
        this.input.noteTextColor,
        this.input.selectedMilestone.id,
        tags
      )
    );
    this.$store.dispatch("CloseDialog");
  }

  private cancel() {
    this.$store.dispatch("CloseDialog");
  }

  private mounted() {
    const options = {
      modules: {
        toolbar: [
          [{ size: ["small", false, "large", "huge"] }], // custom dropdown
          ["bold", "italic", "underline", "strike", "image"], // toggled buttons
          ["blockquote", "code-block"],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: "ordered" }, { list: "bullet" }],
          [{ direction: "rtl" }], // text direction

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ align: [] }],

          ["clean"] // remove formatting button
        ]
      },
      placeholder: "Compose an epic...",
      theme: "snow" // or 'bubble'
    };

    this.editor = new Quill("#editor", options);

    // Setup the categories
    this.categories.forEach(category =>
      this.input.categories.push({ text: category.title, tag: category.tag })
    );
    this.input.selectedCategory = this.input.categories[0];

    // Setup the milestones
    this.milestones.forEach(milestone =>
      this.input.milestones.push({
        text: `Milestone: ${milestone.title}`,
        id: milestone.id
      })
    );
    this.input.selectedMilestone = this.input.milestones[0];
  }

  private inputRequired() {
    return (value: string) => !!value || "Required.";
  }

  private render(h: CreateElement) {
    // Information about the dialog
    const titleInfo = h("Title", { attrs: { content: "Create Note" } });

    // Input the title of the note
    const titleInput = h(
      "v-text-field",
      {
        attrs: {
          outlined: true,
          dense: true,
          autofocus: true,
          label: (<any>this).$lang.Get("title"),
          rules: [this.inputRequired()]
        },
        on: {
          input: (event: any) => {
            this.input.title = event;
          }
        }
      },
      []
    );

    // Pick color for the note
    const colorPicker = h("ColorPicker", {
      attrs: { width: "500", padding: "20" },
      props: {
        value: this.input.noteColor
      },
      on: {
        input: (event: string) => {
          this.colorSelected(event);
        },
        "text-color-selected": (event: string) => {
          this.input.noteTextColor = event;
        }
      }
    });

    // Quill Editor
    const editorInput = h("v-card", { attrs: { light: true } }, [
      h("div", { attrs: { id: "toolbar" } }),
      h("div", {
        staticStyle: { height: "200px" },
        attrs: { id: "editor" }
      })
    ]);

    // Select the tags applying to the note.
    const tagsInput = h("v-autocomplete", {
      staticClass: "create-note__tags",
      attrs: {
        items: this.tagItems,
        searchInput: this.input.tagSearch,
        cacheItems: true,
        smallVhips: true,
        flat: true,
        hideDetails: true,
        value: this.input.tagSearch,
        chips: true,
        label: (<any>this).$lang.Get("tags"),
        solo: true,
        color: "primary",
        multiple: true,
        NoDataText: "No tag found. Tags needs to be created before being used."
      },
      on: {
        "update:searchInput": (event: any) => {
          this.input.tagSearch = event;
        },
        input: (event: any) => {
          this.input.selectedTags = event;
        }
      }
    });

    // Select the milestone where to store the note
    const milestoneSelection = h("v-select", {
      attrs: {
        auto: true,
        items: this.input.milestones,
        value: this.input.selectedMilestone,
        singleLine: true,
        returnObject: true,
        rules: [this.inputRequired()]
      },
      on: {
        input: (event: any) => {
          this.input.selectedMilestone = event;
        }
      }
    });

    // Select category where to store the note.
    const categorySelection = h("v-select", {
      attrs: {
        auto: true,
        items: this.input.categories,
        label: "Category",
        value: this.input.selectedCategory,
        singleLine: true,
        returnObject: true,
        rules: [this.inputRequired()]
      },
      on: {
        input: (event: any) => {
          this.input.selectedCategory = event;
        }
      }
    });

    // Cancel and Create buttons
    const actions = h("div", { staticClass: "create-note__actions" }, [
      h(
        "v-btn",
        {
          attrs: {
            text: true,
            disabled: this.isDisabled,
            color: this.color
          },
          on: { click: this.createNote }
        },
        ["Create"]
      ),
      h(
        "v-btn",
        { attrs: { text: true }, on: { click: this.cancel } },
        "Cancel"
      )
    ]);
    return h("v-card", { staticClass: "create-note" }, [
      titleInfo,
      titleInput,
      colorPicker,
      h("div", [
        editorInput,
        tagsInput,
        h("div", { staticClass: "create-note__selection" }, [
          milestoneSelection,
          categorySelection
        ]),
        actions
      ])
    ]);
  }
}
</script>

<style lang="scss" scoped>
.create-note {
  padding: 10px;

  &__tags {
    margin-top: 10px;
  }

  &__selection {
    padding: 13px;
  }

  &__actions {
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
