<template>
  <div>
    <Tooltip top :content="$lang.Get('tags')">
      <v-list-item id="tags-button" @click="() => {}">
        <v-list-item-action>
          <v-icon style="margin-left:-2px">
            mdi-tag-plus
          </v-icon>
        </v-list-item-action>
      </v-list-item>
    </Tooltip>
    <FloatingDiv
      activator-id="tags-button"
      @action="() => {}"
      width="500"
      dark
      left
      @opened="opened"
    >
      <v-toolbar color="secondary" dark class="px-2 elevation-0">
        <v-text-field
          ref="tag_input"
          v-model="tag"
          :color="color"
          autofocus
          @keyup.enter.native="addTag"
        ></v-text-field>
        <v-btn color="primary" style="border-radius:0;" @click="addTag">{{
          $lang.Get("add")
        }}</v-btn>
      </v-toolbar>
      <ColorPicker width="500" padding="20" v-model="color"></ColorPicker>
      <v-card-title v-if="tag.length > 0" class="justify-center">
        <v-chip small label :class="color">{{ tag }}</v-chip>
      </v-card-title>
      <v-container>
        <div v-if="tags.length < 0">{{ $lang.Get("noTagsCreated") }}</div>
        <v-chip
          label
          v-for="(entry, index) in tags"
          :key="index"
          small
          :class="entry.color"
          close
          @input="removeTag(index)"
          >{{ entry.tag }}</v-chip
        >
      </v-container>
    </FloatingDiv>
  </div>
</template>
<script>
import Utils from "@/core/Utils";

export default {
  name: "TagsSettings",
  data() {
    return {
      tag: "",
      color: "",
      tags: []
    };
  },
  methods: {
    removeTag(index) {
      this.$store.dispatch("removeTag", this.tags[index]);
      this.updateTags();
    },

    addTag() {
      this.$store.dispatch("AddTag", {
        tag: this.tag,
        color: this.color
      });
      this.tag = "";
      this.color = "";
    },

    updateTags() {
      this.tags = this.$store.getters.projectTags;
    },

    opened() {
      // Utils.FocusTextField(this.$refs.tag_input.$el);
    }
  },
  mounted() {
    this.updateTags();
  }
};
</script>

<style scoped></style>
