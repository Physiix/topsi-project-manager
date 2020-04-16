<template>
  <div ref="color_picker" class="app-color-picker">
    <v-card
      class="app-color-picker__item"
      v-for="(color, i) in colors"
      :class="color + ' ' + (color == selected ? 'elevation-5' : '')"
      :key="'color' + i"
      v-text="color.length == 0 ? 'default' : ''"
      @click="Select(color, i)"
      :flat="selected != i"
    >
    </v-card>
  </div>
</template>
<script>
export default {
  name: "ColorPicker",
  props: {
    padding: String,
    width: String,
    value: String
  },
  data() {
    return {
      // To add support for a new color, just add a new line to the array.
      colors: [
        "red white--text",
        "blue white--text",
        "orange black--text",
        "green white--text",
        "purple white--text",
        "indigo white--text",
        "pink white--text",
        "grey black--text",
        "deep-purple white--text",
        "cyan white--text",
        "teal white--text",
        "light-green white--text",
        "yellow white--text",
        "amber white--text",
        "deep-orange white--text",
        "brown white--text",
        "blue-grey white--text",
        ""
      ],
      selected: 0
    };
  },
  methods: {
    /**
     * Iterate trough all the buttons, and apply visual changes to the selected button.
     * Emits an event with the selected color.
     */
    Select(color, index) {
      // Emit an event with the selected color.
      this.$emit("color-selected", color);
      this.$emit("input", color);
    }
  }
};
</script>

<style lang="scss">
.app-color-picker {
  height: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

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
}
</style>
