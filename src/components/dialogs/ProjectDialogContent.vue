<template>
  <Dialog width="600" height="500" no-action class="create-project">
    <ConfirmDialog
      v-if="deleteDialog"
      :title="$lang.Get('delete') + ' ' + project.title"
      :message="$lang.Get('confirmDeleteMessage')"
      :accept-msg="$lang.Get('delete')"
      v-on:accept="Delete"
      v-on:cancel="deleteDialog = false"
      accept-color="error"
    />

    <v-stepper v-model="stepperId" style="height: 100%">
      <v-stepper-header class="elevation-0">
        <v-stepper-step :color="color" editable :complete="stepperId > 1" step="1"
          >Information</v-stepper-step
        >

        <v-divider></v-divider>

        <v-stepper-step :color="color" editable :complete="stepperId > 2" step="2"
          >Preview & Save</v-stepper-step
        >
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1" class="pa-0">
          <div key="project" class="pb-5">
            <v-btn
              block
              color="error"
              v-if="enableDelete"
              @click="deleteDialog = true"
              style="border-radius:0;"
              >{{ $lang.Get("delete") }}</v-btn
            >
            <v-card-title>
              <v-text-field :label="$lang.Get('title')" v-model="title"></v-text-field>
            </v-card-title>
            <v-container class="pa-0 px-3">
              <v-card light class="elevation-2" style="border-radius:0;">
                <div id="toolbar"></div>
                <div id="editor" style="height:180px;"></div>
              </v-card>
            </v-container>
          </div>

          <div style="width: 100%; display: flex; flex-direction: row-reverse;">
            <v-btn text :color="color" @click="stepperId = 2">Preview</v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content step="2">
          <div key="options" class="pa-1">
            <v-card class="ma-2 transparent" elevation="5" style="border-radius: 0">
              <div
                :class="color"
                dense
                height="10"
                style="font-size:0.7em; width: 100%; text-align: center;"
              >
                {{ this.$lang.Get("projectName") }}
              </div>
              <div style="display: flex; " class="white py-0 elevation-2">
                <v-navigation-drawer
                  :class="color"
                  class="px-1 pt-1"
                  permanent
                  stateless
                  height="205"
                  width="50"
                >
                  <v-card
                    v-for="i in 5"
                    :key="i"
                    height="5"
                    elevation="0"
                    class="mb-1"
                    style="border-radius:0"
                    light
                  ></v-card>
                </v-navigation-drawer>
                <div
                  style="width: 100%; display: flex; justify-content: center; align-items:center"
                  ref="categs"
                >
                  <v-card
                    dark
                    height="195"
                    width="80"
                    style="cursor:-webkit-grab;"
                    v-for="(categ, i) in categories"
                    class="text-xs-center pa-0 pa-0 ma-1 project-category elevation-0"
                    :key="categ + i"
                  >
                    <div id="sheet" class="red" @click="removeCategory(i)">
                      <v-icon id="sheet-icon" dark>mdi-close</v-icon>
                    </div>
                    <p style="font-size:8px;">{{ categ }}</p>
                    <v-card v-for="i in 5" :key="i" height="20" class="ma-2 grey"></v-card>
                  </v-card>
                  <v-spacer></v-spacer>
                  <v-btn fab text id="add-category-btn" @click="focusAddCategory">
                    <v-icon :color="color">mdi-plus</v-icon>
                  </v-btn>
                  <FloatingDiv
                    activator-id="add-category-btn"
                    @action="() => {}"
                    dark
                    right
                    release-key="Enter"
                  >
                    <v-card>
                      <v-toolbar class="px-2" color="secondary" height="55">
                        <v-text-field
                          ref="add_category"
                          v-model="category"
                          placeholder="Category"
                          @keyup.enter.native="addCategory"
                          class="pt-2"
                          autofocus
                        ></v-text-field>
                        <v-btn text @click="addCategory">Add</v-btn>
                      </v-toolbar>
                    </v-card>
                  </FloatingDiv>
                </div>
              </div>
            </v-card>

            <div class="pa-2">
              <v-btn block :color="color" @click="selectFolder">PROJECT FOLDER</v-btn>
            </div>
          </div>

          <div style="height: 60px"></div>

          <div style="width: 100%; display: flex; flex-direction: row-reverse;">
            <v-btn :color="color" @click="accept" :disabled="!canCreate">Create</v-btn>

            <v-btn text @click="close">Cancel</v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </Dialog>
</template>
<script>
import Sortable from "sortablejs";
import Quill from "quill";
import os from "os";

import ConfirmDialog from "./ConfirmDialog.vue";
import Utils from "@/core/Utils";

let editor = null;

export default {
  name: "ProjectDialogContent",
  components: {
    ConfirmDialog
  },
  props: {
    project: Object,
    enableDelete: Boolean
  },
  data() {
    return {
      title: "",
      category: "",
      categories: [],
      customPath: "",
      tabItem: null,
      deleteDialog: false,
      stepperId: 1,
      selectedFolder: ""
    };
  },
  computed: {
    color() {
      return this.$store.getters.appColor;
    },

    canCreate() {
      return this.selectedFolder.length > 0 && this.title.length > 0;
    }
  },
  methods: {
    /**
     * Add a new category to the project.
     */
    addCategory() {
      // Make sure the category is valid.
      if (this.category.length <= 0) return;
      this.categories.push(this.category);
      this.category = "";
    },

    /**
     * Remove a category from the project.
     */
    removeCategory(index) {
      this.categories.splice(index, 1);
    },

    selectFolder() {
      const electron = require("electron");
      this.selectedFolder = electron.remote.dialog.showOpenDialogSync(
        electron.remote.getCurrentWindow(),
        {
          title: "Project destination",
          defaultPath: os.homedir(),
          properties: ["openDirectory"]
        }
      )[0];
    },

    close() {
      this.$emit("close");
    },

    accept() {
      if (this.title.length <= 0) {
        return;
      }
      // Format the categories.
      const categories = [];
      this.categories.forEach(category => {
        let categ = category.replace(/ /g, "_");
        categ = categ.toLowerCase();
        categories.push({
          tag: categ,
          title: category,
          folded: false
        });
      });

      // Emit event with the data from the dialog.
      this.$emit("accept", {
        title: this.title,
        description: document.getElementsByClassName("ql-editor")[0].innerHTML,
        categories,
        customPath: this.selectedFolder
      });
    },

    /**
     * Delete the current project.
     * Returns to the project's page when deleted.
     */
    delete() {
      this.deleteDialog = false;
      // Delete the project from the database/
      this.$store.dispatch("DeleteProject", this.project);
    },

    focusAddCategory() {
      Utils.FocusTextField(this.$refs.add_category.$el);
    }
  },

  created() {
    this.customPath = this.project.customPath || this.$store.getters.defaultPath;
  },

  mounted() {
    if (this.$refs.categs) {
      this.title = this.project.title;
      this.category = this.project.category;
      this.categories = this.project.categories;
      // Setup the draggable elements.
      const element = this.$refs.categs;
      const sortable = Sortable.create(element, {
        group: {
          name: "Categories"
        },
        onEnd: event => {
          const newIndex = event.oldIndex < event.newIndex ? event.newIndex + 1 : event.newIndex;
          const tmp = this.categories[event.oldIndex];
          this.categories.splice(event.oldIndex, 1);
          this.categories.splice(newIndex, 0, tmp);
        },
        animation: 100
      });
    }

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
      editor = new Quill("#editor", options);
      document.getElementsByClassName("ql-editor")[0].innerHTML = this.project.description;
    }
  }
};
</script>

<style lang="scss" scoped>
.create-project {
  &__options {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
}
</style>

<style scoped>
.project-category {
  height: 100px;
}

#sheet {
  visibility: hidden;
  height: 0;
  transition: 0.1s;
  cursor: pointer;
}
#sheet-icon {
  transition: 0s;
  padding-top: 3px;
}
.project-category:hover #sheet {
  visibility: visible;
  height: 30px;
}
</style>
