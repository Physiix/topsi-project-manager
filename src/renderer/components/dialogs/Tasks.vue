<template>
	<v-card style="border-radius:0;" class="elevation-0" :color="bgColor" height="350">
		<v-container>
			<div class="headline pl-0 ml-0 pb-2">{{$lang.Get('tasks')}}
			</div>
			<div v-if="displayTasks">
				<v-text-field :label="$lang.Get('newTask')" v-model="task" @keydown.enter="AddTask" solo append-icon="arrow_right" light="" />
				<div ref="container" style="max-height:200px;overflow-y:auto;">
					<div v-for="(task, index) in tasks" :key="index">
						<Task :task="task" />
					</div>
				</div>
			</div>
		</v-container>
	</v-card>
</template>
<script>
import Task from './Task.vue'

import _ from 'lodash'
import Sortable from 'sortablejs'

export default {
	name: 'Tasks',
	components: {
		Task
	},
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

		bgColor() {
			return (!this.$store.getters.isDarkMode) ? 'grey lighten-2' : '';
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

		RetrieveTasks() {
			this.tasks = (this.note.tasks) ? this.note.tasks.map(task => JSON.parse(JSON.stringify(task))) : [];
		},

		ToggleFold() {
			this.$store.dispatch('ToggleDisplayTasks');
		}
	},

	mounted() {
		const element = this.$refs.container;
		const sortable = Sortable.create(element, {
			group: {
				name: "Tasks",
			},
			onEnd: (event) => {
				this.$store.dispatch('ReorderTasks', {
					oldIndex: event.oldIndex,
					newIndex: event.newIndex
				});
			},
			animation: 100
		});
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