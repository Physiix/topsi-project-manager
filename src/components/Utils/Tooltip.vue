<template>
  <v-tooltip :right="right" :left="left" :top="top" :bottom="bottom">
    <template v-slot:activator="{ on }">
      <slot v-on="on" />
    </template>
    <span>{{ content }}</span>
  </v-tooltip>
</template>
<script>
export default {
  name: "Tooltip",
  props: {
    right: String,
    left: String,
    top: String,
    bottom: String,
    content: {
      type: String,
      required: true
    }
  }
};
</script>

<style scoped></style>
