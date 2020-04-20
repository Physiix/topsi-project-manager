<template>
  <v-dialog :persistent="isPersistent" overlay-opacity="0.5" v-model="enabled" max-width="600px">
    <component :is="dialogComponent" />
  </v-dialog>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Dialogs } from "@/core/Constants";

@Component({})
export default class extends Vue {
  private get enabled() {
    return this.$store.getters.isDialogOpened;
  }

  private get isPersistent() {
    return this.dialogComponent === Dialogs.EditNote;
  }

  private set enabled(value) {
    this.$store.dispatch("CloseDialog");
  }

  private get dialogComponent() {
    return this.$store.getters.dialogComponent;
  }
}
</script>

<style lang="scss" scoped></style>
