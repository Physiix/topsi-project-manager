<template>
  <div ref="color_picker" class="app-color-picker">
    <div class="app-color-picker__swatch-container">
      <v-card
        class="app-color-picker__item"
        v-for="(color, i) in colors"
        :color="color"
        :class="color == selected ? 'elevation-5' : ''"
        :key="'color' + i"
        v-text="color.length == 0 ? 'default' : ''"
        @click="select(color, i)"
        :flat="selected != i"
      ></v-card>
    </div>
    <v-divider></v-divider>
    <v-btn
      class="app-color-picker__button"
      block
      outlined
      @click="showCustomColor"
      :color="color"
    >CUSTOM COLOR...</v-btn>
    <v-checkbox label="White Text" v-model="whiteText"></v-checkbox>

    <template v-if="customColor.enabled">
      <div class="app-color-picker__overlay" @click="selectCustomColor"></div>
      <v-color-picker v-model="customColor.value" class="app-color-picker__custom" show-swatches></v-color-picker>
    </template>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import { WHITE_TEXT, BLACK_TEXT } from "@/core/Constants";

class CustomColor {
  public value: string = "";
  public enabled: boolean = false;
}

@Component({})
export default class extends Vue {
  @Prop({
    type: String,
    required: true
  })
  private value!: string;

  private customColor: CustomColor = new CustomColor();

  private whiteText: boolean =
    this.$store.getters.appColor.indexOf(WHITE_TEXT) !== -1;

  private colors: string[] = [
    "#F44336",
    "#2196F3",
    "#ff9800",
    "#4CAF50",
    "#9c27b0",
    "#3f51b5",
    "#e91e63",
    "#9e9e9e",
    "#673ab7",
    "#00bcd4",
    "#009688",
    "#8bc34a",
    "#ffeb3b",
    "#ffc107",
    "#ff5722",
    "#795548",
    "#607d8b",
    ""
  ];
  private selected: number = this.colors.findIndex(
    color => this.value.indexOf(color) !== -1
  );

  @Watch("whiteText")
  private textColorUpdated() {
    this.$emit("text-color-selected", this.whiteText ? WHITE_TEXT : BLACK_TEXT);
  }

  private showCustomColor() {
    this.customColor.enabled = true;
  }

  private selectCustomColor() {
    this.customColor.enabled = false;
    console.log(this.customColor.value);
    this.select(this.customColor.value, -1);
  }

  /**
   * Iterate trough all the buttons, and apply visual changes to the selected button.
   * Emits an event with the selected color.
   */
  private select(color: string, index: number) {
    // Emit an event with the selected color.
    this.selected = index;
    this.$emit("input", color);
  }

  private get color() {
    return this.value;
  }
}
</script>

<style lang="scss">
.app-color-picker {
  width: 100%;
  padding: 0 10px 0 10px;

  &__swatch-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__overlay {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: black;
    opacity: 0.5;
  }

  &__custom {
    position: fixed;
    top: 20%;
    left: 50%;
    transform: translateX(-50%);
    height: 500px;
    z-index: 10;
  }

  &__item {
    height: 10px !important;
    width: 30px;
    border-radius: 0 !important;
    padding: 0;
    margin: 0;
    margin-bottom: 10px;
    border-radius: 0;
    font-size: 5px;
  }

  &__container {
    width: 100%;
    display: flex;
  }

  &__button {
    border-radius: 0;
  }
}
</style>
