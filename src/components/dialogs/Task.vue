<template>
  <v-checkbox
    @change="toggle"
    v-model="task.done"
    class="py-0 my-0"
    :label="!edit ? task.content : ''"
    :color="color"
    :class="task.done ? 'task-done' : ''"
    @dbclick.native="edit"
  ></v-checkbox>
</template>
<script>
export default {
  name: "Task",
  props: {
    task: Object
  },
  data() {
    return {
      edit: false
    };
  },
  computed: {
    color() {
      return this.$store.getters.appColor;
    }
  },
  methods: {
    toggle() {
      this.$store.dispatch("ToggleTask", this.task);
    },

    edit() {}
  }
};
</script>

<style scoped></style>
