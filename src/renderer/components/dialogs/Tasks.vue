<template>
	<v-container>
		<div class="headline pl-0 ml-0">Tasks</div>
		<v-text-field label="New task" v-model="task" @keydown.enter="AddTask"></v-text-field>
		<div style="max-height:300px;overflow-y:auto;">
			<v-checkbox class="py-0 my-0" v-for="(task, index) in tasks" :key="index" :label="task.content" :input-value="task.done"></v-checkbox>
		</div>
	</v-container>
</template>
<script>

export default {
	name: 'Tasks',
	data() {
		return {
			task: ''
		}
	},
	computed: {
		note() {
			return this.$store.state.NotesStore.openedNote;
		},

		tasks() {
			return this.note.tasks;
		}
	},
	methods: {
		AddTask() {
			this.$store.dispatch('AddTask', this.task);
			this.task = '';
		}
	},
}
</script>

<style scoped>

</style>