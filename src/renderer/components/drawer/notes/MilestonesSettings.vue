<template>
	<div>
		<Tooltip content="Current milestone settings" top>
			<v-list-tile id="milestone-button" @click="">
				<v-list-tile-action>
					<v-icon>timeline</v-icon>
				</v-list-tile-action>
			</v-list-tile>
		</Tooltip>
		<FloatingDiv activator-id="milestone-button" v-on:action="" width="500" dark left height=500>
			<div id="milestone-container" style="height:500px;">
				<div id="milestone-content">
					<v-container>
						<v-toolbar class="px-2" color="transparent" flat>
							<v-text-field solo light v-model="title"></v-text-field>
							<v-btn flat>
								Update
							</v-btn>
						</v-toolbar>

						<v-progress-linear color="success" background-color="red" height="5" :value="notesDoneRatio()"></v-progress-linear>

					</v-container>
				</div>
				<div id="milestone-side" class="">
					<v-tabs centered grow slider-color="primary">
						<v-tab>
							TODO
						</v-tab>
						<v-tab>
							Done
						</v-tab>

						<v-tabs-items>
							<v-tab-item style="overflow-y:auto;height:300px;">
								<v-container>
									<v-list>
										<v-list-tile v-for="(item, index) in notes.todo" :key="item.id" avatar ripple @click="">
											<v-list-tile-content>
												<v-list-tile-title>{{ item.title }}</v-list-tile-title>
											</v-list-tile-content>
											<v-list-tile-action>
												<v-list-tile-action-text>#{{ item.id }}</v-list-tile-action-text>
											</v-list-tile-action>
										</v-list-tile>
									</v-list>
								</v-container>
							</v-tab-item>
							<v-tab-item style="overflow-y:auto;height:300px;">
								<v-container>
									<v-list>
										<v-list-tile v-for="(item, index) in notes.done" :key="item.id" avatar ripple @click="">
											<v-list-tile-content>
												<v-list-tile-title>{{ item.title }}</v-list-tile-title>
											</v-list-tile-content>
											<v-list-tile-action>
												<v-list-tile-action-text>#{{ item.id }}</v-list-tile-action-text>
											</v-list-tile-action>
										</v-list-tile>
									</v-list>
								</v-container>
							</v-tab-item>
						</v-tabs-items>
					</v-tabs>
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
			title: 'Milestone',
			selected: [2],
			notes: {
				all: [],
				done: [],
				todo: []
			}
		}
	},
	watch: {
		title(value) {
			console.log(value)
		}
	},
	computed: {
	},
	methods: {
		notesDoneRatio() {
			const notes = this.dNotes;
			return this.notes.done.length * 100 / this.notes.all.length;
		},

		getNotes() {
			const timelineId = this.$store.state.AppStore.currentTimelineId;
			return this.$store.getters.GetNotes.filter(note => note.timeline_id == timelineId);
		},
	},
	mounted() {
		this.notes.all = this.getNotes();
		this.notes.done = this.notes.all.filter(n => n.category == 'done');
		this.notes.todo = this.notes.all.filter(n => n.category != 'done');
	}
}
</script>

<style scoped>
#milestone-container{
	display: grid;
	grid-template-columns: 1fr; 
	grid-template-rows: 1fr 3fr;
}

#milestone-side{
	grid-column: 1 / 2;
	grid-row: 2 / 3;
	overflow-y: auto;
	overflow-x: hidden;
}

#milestone-content{
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	overflow-x: auto;
	overflow-y: hidden;
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
