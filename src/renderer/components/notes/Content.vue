<template>
	<div class="content">
		<div class="top pa-3 title">
			<!-- <v-toolbar color="secondary" dark class="elevation-0" dense>
				<v-toolbar-title class="subheading" scroll-off-screen> -->
			{{title}}
			<!-- </v-toolbar-title>
			</v-toolbar> -->
		</div>
		<div class="bottom" :id="id">
			<Note v-for="(note, index) in notes" :key="index" :note="note" class="mx-4" />
		</div>
		<div class="vline grey"></div>
	</div>
</template>
<script>
import Note from './Note.vue'
import Sortable from 'sortablejs'

export default {
	name: 'Content',
	components: {
		Note
	},
	props: {
		id: String,
		tag: String
	},
	data() {
		return {

		}
	},
	computed: {
		title() {
			return this.tag == 'todo' ? 'TODO' : this.tag == 'in_progress' ? 'In Progress' : 'Done';
		},

		notes() {
			const timelineId = this.$store.state.AppStore.currentTimelineId;
			return this.$store.getters.GetNotesById(this.$store.state.AppStore.openedProjectId).filter(note => note.timeline_id == timelineId && note.category == this.tag);
		}
	},
	methods: {

	},
	mounted() {
		const element = document.getElementById(this.id);
		const sortable = Sortable.create(element, {
			group: {
				name: "c",
			},
			onEnd: (event) => {
				// console.log(this.id, document.getElementsByClassName('note'));
				console.log(event)
			},

			onMove: (event) => {
				// console.log(event.dragged)
			}

		});
		// console.log(sortable)
	}
}
</script>

<style scoped>

.content{
	display: grid;
	grid-template-columns: 1fr 1px;
	grid-template-rows: 48px 1fr;
	height: 100%;
}

.top{
	grid-column: 1 / 2;
	grid-row: 1 / 2;
}

.bottom{
	grid-column: 1 / 2;
	grid-row: 2 / 3;
}

.bottom {
	overflow-y: scroll;
	overflow-x: hidden;
	background-color: rgba(0,0,0,0);
	-webkit-background-clip: text;
	transition: background-color .2s;
}
.bottom:hover {
	background-color: rgba(102, 102, 102, 0.5);  
}
.bottom::-webkit-scrollbar-thumb {
	background-color: inherit;
}

.vline{
	grid-column: 2 /3;
	grid-row: 1 /3
}

.title_card{
	border-radius: 0;
}
</style>