<template>
  <div style="height:100%;width:100%" class="pa-2" @click="unfold">
    <v-card class="px-2 elevation-3" style="cursor:pointer;">
      <v-btn icon style="width:0px;" @click="unfold">
        <v-icon small class="pr-2">
          add
        </v-icon>
      </v-btn>
      <strong>{{ category.title.toUpperCase() }}</strong>
    </v-card>
  </div>
</template>
<script>
export default {
  name: "FoldedContent",
  props: {
    projectId: Number,
    category: Object
  },
  methods: {
    unfold() {
      this.$store.dispatch("ToggleFoldCategory", {
        projectId: this.projectId,
        category: this.category
      });
    }
  }
};
</script>

<style scoped></style>
