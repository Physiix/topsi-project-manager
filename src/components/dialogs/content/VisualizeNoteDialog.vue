<template>
  <v-card>
    <v-card-title primary-title>
      {{ note.title }}
    </v-card-title>
    <v-card-text>
      <v-chip v-for="(tag, i) in note.tags" :key="i"> {{ tag.tag }} </v-chip>
    </v-card-text>
    <v-card-text v-html="note.description"> </v-card-text>
    <v-card-actions class="visualize-dialog__actions">
      <v-btn text :color="color" @click="close">Close</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Note } from "../../../core/Data";

@Component({})
export default class extends Vue {
  get note(): Note {
    return this.$store.getters.openedNote!;
  }

  get color(): string {
    return this.$store.getters.appColor;
  }

  private close(): void {
    this.$store.dispatch("CloseDialog");
  }
}
</script>

<style lang="scss" scoped>
.visualize-dialog {
  &__actions {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
}
</style>
