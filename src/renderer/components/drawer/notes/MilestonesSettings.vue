<template>
	<div>
		<Tooltip content="Milestones" top>
			<v-list-tile id="milestone-button" @click="">
				<v-list-tile-action>
					<v-icon>timeline</v-icon>
				</v-list-tile-action>
			</v-list-tile>
		</Tooltip>
		<FloatingDiv activator-id="milestone-button" v-on:action="" width="500" dark left height=500>
			<div id="milestone-container" style="height:500px;">
				<div id="milestone-content" class="elevation-5">
					<v-container>
						<v-toolbar class="px-2" color="transparent" flat>
							<v-text-field solo light v-model="title"></v-text-field>
							<v-btn flat>
								Update
							</v-btn>
						</v-toolbar>

						<v-progress-linear color="success" background-color="red" height="5" :value="notesDone"></v-progress-linear>
					</v-container>
				</div>
				<div id="milestone-side" class="">
					<!-- <div v-for="i in 2" :key="i">
						<v-btn :ripple="false" color="primary" class="milestone-btn elevation-0" fab>
							<div style="font-size:8px;">
								Milestone {{i}}
							</div>
						</v-btn>
					</div>
					<v-btn fab class="milestone-btn elevation-0" :ripple=false color="transparent">
						<v-icon>add</v-icon>
					</v-btn> -->
				</div>
			</div>
		</FloatingDiv>
	</div>
</template>
<script>

export default {
	name: 'MilestonesSettings',
	components: {

	},
	props: {

	},
	data() {
		return {
			title: 'Milestone'
		}
	},
	watch: {
		title(value) {
			console.log(value)
		}
	},
	computed: {
		notesDone() {
			const timelineId = this.$store.state.AppStore.currentTimelineId;
			const notes = this.$store.getters.GetNotes.filter(note => note.timeline_id == timelineId);
			return notes.filter(n => n.category == 'done').length * 100 / notes.length;
		}
	},
	methods: {

	},
}
</script>

<style scoped>
#milestone-container{
	display: grid;
	grid-template-columns: 1fr 75px; 
	grid-template-rows: 1fr;
}

#milestone-side{
	grid-column: 2 / 3;
	grid-row: 1 / 2;
	overflow-y: auto;
	overflow-x: hidden;
}

#milestone-content{
	grid-column: 1 / 2;
	grid-row: 1 / 2;
}
.milestone-btn{
	transition:100ms!important;
}

.milestone-btn:hover{
	border-radius: 10%!important;
	/* color:red!important; */
}

</style>

<style>

</style>
