<template>
  <Content />
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Content from "./Content.vue";

@Component({
  components: {
    Content
  }
})
export default class extends Vue {}
</script>

<style lang="scss" scoped>
</style>
