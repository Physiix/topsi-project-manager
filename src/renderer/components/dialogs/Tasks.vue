<template>
	<v-card style="border-radius:0;" class="elevation-0" :color="bgColor" height="350">
		<v-container>
			<div class="headline pl-0 ml-0 pb-2">Tasks
			</div>
			<div v-if="displayTasks">
				<v-text-field label="New task" v-model="task" @keydown.enter="AddTask" solo append-icon="arrow_right" light="" />
				<div style="max-height:200px;overflow-y:auto;">
					<div v-for="(task, index) in tasks" :key="index">
						<v-checkbox @change="Toggle(task)" v-model="task.done" class="py-0 my-0" :label="task.content" :color="color" :class="(task.done)?'task-done':''"></v-checkbox>
					</div>
				</div>
			</div>
		</v-container>
	</v-card>
</template>
<script>

import _ from 'lodash'

export default {
	name: 'Tasks',
	data() {
		return {
			task: '',
			tasks: [],
		}
	},
	computed: {
		note() {
			return this.$store.state.NotesStore.openedNote;
		},

		color() {
			return this.$store.getters.appColor;
		},

		bgColor() {
			return (!this.$store.getters.IsDarkMode) ? 'grey lighten-2' : '';
		},

		displayTasks: {
			get() {
				return this.$store.getters.isDisplayTasks;
			}
		}
	},
	methods: {
		AddTask() {
			if (this.task.length <= 0) return;
			this.$store.dispatch('AddTask', this.task);
			this.task = '';
			this.RetrieveTasks();
		},

		Toggle(task) {
			this.$store.dispatch('ToggleTask', task);
		},

		RetrieveTasks() {
			this.tasks = (this.note.tasks) ? this.note.tasks.map(task => JSON.parse(JSON.stringify(task))) : [];
		},

		ToggleFold() {
			this.$store.dispatch('ToggleDisplayTasks');
		}
	},
	created() {
		this.RetrieveTasks();
	}
}
</script>

<style >

.task-done label{
	text-decoration: line-through;
}

</style>