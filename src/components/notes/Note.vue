<script lang="ts">
import Vue, { CreateElement } from "vue";
import Component from "vue-class-component";

import NoteTags from "./NoteTags.vue";
import { Note } from "@/core/Data";
import { WHITE_TEXT } from "../../core/Constants";

@Component({
  name: "Note",
  components: {
    NoteTags
  },
  props: {
    note: {
      type: Object,
      required: true
    }
  }
})
export default class extends Vue {
  private note!: Note;

  private edit() {
    this.$store.dispatch("EditNote", this.note);
  }

  open() {
    this.$store.dispatch("VisualizeNote", this.note);
  }

  get dark() {
    return this.note.textColor === WHITE_TEXT;
  }
  render(h: CreateElement) {
    return h(
      "v-card",
      {
        props: {
          color: this.note.color,
          minHeight: 100,
          dark: this.dark
        },
        attrs: {
          id: "note-" + this.note.id
        },
        on: { dblclick: this.open },
        class: "note"
      },
      [
        h("v-card-title", { class: "py-2 pt-3 pr-0" }, [
          h("div", { class: "note__top" }, [
            h("div", { class: "note__top__id" }, `#${this.note.id}`),
            h("div", { class: "note__top__title" }, this.note.title),
            h(
              "v-btn",
              {
                props: { small: true, icon: true },
                on: { click: this.edit },
                class: "mr-2"
              },
              [h("v-icon", { props: { size: 18 } }, "mdi-pencil")]
            )
          ])
        ]),
        h("v-divider"),
        h("NoteTags", {
          props: { "note-color": this.note.color, tags: this.note.tags },
          class: "note__tags"
        }),

        h("div", {
          class: "note__bottom",
          domProps: { innerHTML: this.note.description }
        })
      ]
    );
  }
}
</script>

<style lang="scss" scoped>
$id-color: #2196f3;
$separator-color: #e6e6e6;

.note {
  cursor: pointer;
  transition: 0.1s;
  animation: show-note 200ms ease-in-out;
  user-select: none;
  margin: 10px;

  &__top {
    display: flex;
    width: 100%;
    justify-content: space-between;

    &__id {
      font-size: 0.6em;
      color: $id-color;
    }

    &__title {
      font-size: 0.7em;
    }
  }

  &__separator {
    width: 100%;
    height: 10px;
    padding: 5px;

    &::after {
      content: "";
      background: $separator-color;
      display: block;
      min-width: 100%;
      min-height: 1px;
    }
  }

  &__tags {
    padding: 0 10px 0 10px;
  }

  &__button {
    border-radius: 0;
    min-width: 10px !important;
    max-height: 10px !important;
    margin: 0;
  }

  &__bottom {
    padding: 5px;
  }

  &:hover {
    opacity: 0.8;
  }

  @keyframes show-note {
    0% {
      transform: translateY(30%);
    }

    100% {
      transform: translateY(0);
    }
  }

  .v-card__text img {
    width: 100%;
  }

  .tag {
    border-radius: 5% !important;
    z-index: 0;
  }
}
</style>
