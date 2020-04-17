<script lang="ts">
import Vue, { CreateElement, VNode } from "vue";
import Component from "vue-class-component";

@Component({
  name: "Helper"
})
export default class extends Vue {
  private dialog: boolean = true;
  private shortcuts = [
    {
      key: "CTRL+D",
      description: "Show/Hide the helper page."
    },
    {
      key: "CTRL+F",
      description: "Show/Hide the search bar."
    },
    {
      key: "CTRL+L",
      description: "Show the milestones list."
    },
    {
      key: "CTRL+N",
      description: "Create a new Note."
    }
  ];
  close() {
    this.$store.commit("ToggleShowHelper");
  }
  render(h: CreateElement) {
    const shortcutsLoop = (h: CreateElement) => {
      const children: VNode[] = [];
      this.shortcuts.forEach(shortcut => {
        children.push(
          h("div", { class: "helper__item" }, [
            h("strong", shortcut.key),
            h("div", shortcut.description)
          ])
        );
      });
      return [h("div", children)];
    };

    return h("div", { class: "text-xs-center " }, [
      h(
        "v-dialog",
        {
          props: { value: this.dialog, width: "600", persistent: true },
          on: {
            input: (event: any) => {
              this.dialog = event.target.value;
            }
          }
        },
        [
          h("v-card", {}, [
            h(
              "v-card-title",
              {
                props: { dark: true, "primary-title": true },
                class: "headline justify-center "
              },
              (<any>this).$lang.Get("helperTitle")
            ),
            h("v-card-text", { class: "text-xs-left " }, [h("div", shortcutsLoop(h))]),
            h("v-card-actions", {}, [
              h("v-spacer", {}),
              h(
                "v-btn",
                {
                  props: { color: "primary", text: true },
                  on: { click: this.close }
                },
                (<any>this).$lang.Get("close")
              )
            ])
          ])
        ]
      )
    ]);
  }
}
</script>

<style lang="scss" scoped>
.helper {
  &__item {
    display: flex;
    flex-direction: row;
    width: 100%;
    margin: 10px 0 10px 0;
    div {
      padding: 0 20px 0 20px;
    }
  }
}
</style>
