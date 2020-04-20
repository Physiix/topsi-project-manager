<script lang="ts">
import Vue, { CreateElement, VNode } from "vue";
import Component from "vue-class-component";
import { Project } from "../../../core/Data";
import ProjectManager from "../../../core/ProjectManager";

@Component({})
export default class extends Vue {
  private selectedProject: Project = this.projects[0];

  private get projects(): Project[] {
    return this.$store.getters.projects;
  }

  private get color() {
    return this.$store.getters.appColor;
  }

  /**
   * Handle the 'Save' button click.
   */
  private exportProject() {
    // Make sure a project is selected.
    if (this.selectedProject == null) return;

    // Save the project.
    ProjectManager.saveProject(this.selectedProject);
  }

  private render(h: CreateElement) {
    const genProjectSelections = (h: CreateElement) => {
      const children: VNode[] = [];
      this.projects.forEach(project => {
        children.push(
          h(
            "v-radio",
            {
              props: {
                color: this.color,
                label: project.title,
                value: project.id
              }
            },
            project.title
          )
        );
      });
      return children;
    };

    return h("v-card", { class: "export-project " }, [
      h("div", { class: "export-project__title font-weight-light " }, "Export Projects"),
      h("div", { class: "export-project__container " }, [
        h(
          "v-radio-group",
          {
            props: { color: this.color, column: true },
            on: {
              input: (event: any) => {
                this.selectedProject = event.target.value;
              }
            },
            domProps: { value: this.selectedProject }
          },
          [genProjectSelections(h)]
        )
      ]),
      h("div", { class: "export-project__actions " }, [
        h(
          "v-btn",
          {
            props: { text: true, right: true, color: this.color },
            on: { click: this.exportProject }
          },
          "Export"
        )
      ])
    ]);
  }
}
</script>

<style lang="scss" scoped>
.export-project {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__title {
    padding: 20px;
    font-size: 1.1em;
  }

  &__container {
    padding: 20px;
  }

  &__actions {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
