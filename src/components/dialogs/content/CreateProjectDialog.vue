<script lang="ts">
import os from "os";
import Vue, { VNode } from "vue";
import Quill from "quill";
import Component from "vue-class-component";
import { Category, Project } from "../../../core/Data";
import Title from "../utils/Title.vue";
import { CreateElement } from "vue/types/umd";

// User input for the Dialog.
class Input {
  public title: string = "";
  public description: string = "";
  public category: string = "";
  public categories: string[] = ["TODO", "In Progress", "Done"];
  public selectedFolder: string = "";
}

@Component({
  components: {
    Title
  }
})
export default class extends Vue {
  private editor: any = null;
  private input: Input = new Input();
  private readonly stepperId: string = "i";

  private get color() {
    return this.$store.getters.appColor;
  }

  /**
   * Add the new categories to the list, and clean up the category input.
   */
  private addCategory() {
    this.input.categories.push(this.input.category);
    this.input.category = "";
  }

  /**
   * @return Whether the button to create a new project is disabled.
   */
  private get isDisabled() {
    return (
      this.input.title.length === 0 ||
      this.input.categories.length === 0 ||
      this.input.selectedFolder.length === 0
    );
  }

  /**
   * Open OS's dialog to chose a folder.
   */
  private selectFolder() {
    const electron = require("electron");
    this.input.selectedFolder = electron.remote.dialog.showOpenDialogSync(
      electron.remote.getCurrentWindow(),
      {
        title: "Project destination",
        defaultPath: os.homedir(),
        properties: ["openDirectory"]
      }
    )![0];
  }

  private createProject() {
    // Create category objects from strings.
    const categories: Category[] = [];
    this.input.categories.forEach(category => {
      let categ = category.replace(/ /g, "_");
      categ = categ.toLowerCase();
      categories.push(new Category(categ, category, false));
    });

    this.$store.dispatch(
      "CreateProject",
      new Project(
        this.input.title,
        document.getElementsByClassName("ql-editor")[0].innerHTML,
        categories,
        this.input.selectedFolder
      )
    );
    this.$store.dispatch("CloseDialog");
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
  }

  private render(h: CreateElement) {
    const categoriesLoop = (h: CreateElement) => {
      const children: VNode[] = [];
      this.input.categories.forEach(category => {
        children.push(h("v-chip", { props: { small: true } }, category));
      });
      return children;
    };

    /**
     * Input for the project's title
     */
    const title = () =>
      h("v-text-field", {
        props: {
          color: this.color,
          label: (<any>this).$lang.Get("title"),
          outlined: true,
          dense: true,
          rules: [(value: string) => !!value || "Required."],
          value: this.input.title
        },
        on: {
          input: (event: any) => {
            this.input.title = event;
          }
        },
        class: "create-project__title "
      });

    /**
     * Quill editor to write the description with
     */
    const editor = () =>
      h("div", {}, [
        h(
          "v-card",
          {
            props: { light: true },
            class: "elevation-2 ",
            style: "border-radius:0;"
          },
          [
            h("div", { props: { id: "toolbar" } }),
            h("div", {
              attrs: {
                id: "editor"
              },
              style: "height:180px;"
            })
          ]
        )
      ]);

    /**
     * Input for the categories of the project to create
     */
    const categoryInput = () =>
      h("v-text-field", {
        props: {
          color: this.color,
          label: "Categories",
          placeholder: "Input a new category and hit enter. E.g. TODO",
          "append-icon": "mdi-backburger",
          outlined: true,
          dense: true,
          value: this.input.category
        },
        on: {
          input: (event: any) => {
            this.input.category = event;
          },
          keyup: (event: any) => {
            if (event.keyCode !== 13) {
              return;
            }
            this.addCategory();
          }
        },
        class: "create-project__category "
      });

    /**
     * Vizualise the categories entered by the user
     */
    const categoryChips = () => h("div", [categoriesLoop(h)]);

    /**
     * Select folder where to store the project's file.
     */
    const selectFolder = () =>
      h("div", { class: "create-project__folder-input " }, [
        h(
          "v-btn",
          {
            props: { color: this.color },
            on: { click: this.selectFolder },
            class: "create-project__folder-input__button "
          },
          "Browse Folder..."
        ),
        h(
          "div",
          { class: "create-project__folder-input__desc " },
          this.input.selectedFolder ? this.input.selectedFolder : "No folder selected yet."
        )
      ]);

    /**
     * Buttons to cancel or create the project.
     */
    const actionButton = () =>
      h(
        "div",
        {
          style: "width: 100%; display: flex; flex-direction: row-reverse;"
        },
        [
          h(
            "v-btn",
            {
              props: {
                text: true,
                disabled: this.isDisabled,
                color: this.color
              },
              on: { click: this.createProject }
            },
            "Create Project"
          )
        ]
      );
    return h("v-card", { class: "create-project " }, [
      h("Title", { props: { content: "Project Information" } }),
      h("div", { class: "create-project__container " }, [
        h("div", { props: { step: "1" }, class: "create-project__stepper " }, [
          h("div", { class: "create-project__stepper__content " }, [
            h("div", {}, [title(), editor(), categoryInput(), categoryChips()]),
            selectFolder(),
            actionButton()
          ])
        ])
      ])
    ]);
  }
}
</script>

<style lang="scss" scoped>
.create-project {
  $element-spacing: 15px;

  &__container {
    height: 100%;
    padding: 20px;
  }

  &__category {
    margin-top: $element-spacing;
  }

  &__stepper {
    height: 87%;
    &__content {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
  }

  &__folder-input {
    width: 100%;
    padding-top: $element-spacing;
    display: flex;

    &__button {
      border-radius: 0;
    }

    &__desc {
      margin-top: 5px;
      padding-left: 20px;
    }
  }
}
</style>
