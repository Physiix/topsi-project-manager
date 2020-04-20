<template>
  <v-stepper v-model="stepperId" class="elevation-0">
    <v-stepper-header>
      <v-divider></v-divider>
      <v-stepper-step :color="color" step="i">{{ content }}</v-stepper-step>

      <v-divider></v-divider>
    </v-stepper-header>
  </v-stepper>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

@Component({
  props: {
    content: {
      type: String,
      required: true,
      validator: value => value.length > 0
    }
  }
})
export default class extends Vue {
  private stepperId: string = "i";

  private get color() {
    return this.$store.getters.appColor;
  }
}
</script>

<style lang="scss" scoped></style>
