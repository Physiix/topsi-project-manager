<template>
	<v-checkbox @change="Toggle" v-model="task.done" class="py-0 my-0" :label="!edit?task.content:''" :color="color" :class="(task.done)?'task-done':''" @dbclick.native="Edit"></v-checkbox>
</template>
<script>

export default {
	name: 'Task',
	props: {
		task: Object
	},
	data() {
		return {
			edit: false,
		}
	},
	computed: {
		color() {
			return this.$store.getters.appColor;
		},
	},
	methods: {
		Toggle() {
			this.$store.dispatch('ToggleTask', this.task);
		},

		Edit() {
			console.log('this')
		}
	},
}
</script>

<style scoped>

</style>