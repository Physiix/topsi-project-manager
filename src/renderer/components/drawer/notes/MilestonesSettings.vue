<template>
	<div>
		<Tooltip content="Current milestone settings" top>
			<v-list-tile id="milestone-button" @click="">
				<v-list-tile-action>
					<v-icon style="margin-left:-2px">timeline</v-icon>
				</v-list-tile-action>
			</v-list-tile>
		</Tooltip>
		<FloatingDiv activator-id="milestone-button" v-on:action="" width="500" dark left height=500>
			<div id="milestone-container">
				<div id="milestone-list">
					<v-layout row class="pt-2">
						<div v-for="i in 5" :key="i" style="height:100px" :class="(i == selectedId)?'milestone-selected':''">
							<v-card class="milestone-pointer grey elevation-0"></v-card>
							<v-card fab class="mx-2 primary milestone-entry" @click.native="Select(i)">
								<div style="font-size:8px;">
									Milestone {{i}}
								</div>
							</v-card>
						</div>
					</v-layout>
				</div>
				<div id="milestone-content">
					<v-container class="pt-0">
						<v-toolbar height="20" class="ma-0 transparent elevation-0">
							<v-spacer></v-spacer>
							<v-btn v-if="!listOpened" icon @click="Open">
								<v-icon>
									keyboard_arrow_down
								</v-icon>
							</v-btn>
							<v-btn v-else icon @click="Close">
								<v-icon>
									keyboard_arrow_up
								</v-icon>
							</v-btn>
							<v-spacer></v-spacer>
						</v-toolbar>
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
					<v-tabs centered grow slider-color="primary" style="overflow-y:hidden;">
						<v-tab>
							TODO
						</v-tab>
						<v-tab>
							{{this.lang.Get('done')}}
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
				</div>
			</div>
		</FloatingDiv>
	</div>
</template>
<script>

export default {
	name: 'MilestonesSettings',
	data() {
		return {
			title: 'Milestone',
			finishingCategory: '',
			selected: [2],
			notes: {
				all: [],
				done: [],
				todo: []
			},
			listOpened: false,
			listHeight: 60,
			selectedId: 1
		}
	},
	computed: {
		milestoneId() {
			return this.$store.getters.currentMilestoneId;
		}
	},
	watch: {
		title(value) {
			console.log(value)
		},

		milestoneId(value) {
			this.Update();
		}
	},
	methods: {
		notesDoneRatio() {
			const notes = this.dNotes;
			return this.notes.done.length * 100 / this.notes.all.length;
		},

		getNotes() {
			return this.$store.getters.notes;
		},

		Select(index) {
			this.selectedId = index;
		},

		Open() {
			const container = document.getElementById('milestone-container');
			const list = document.getElementById('milestone-list');

			let value = 0;
			const openId = setInterval(() => {
				container.style.gridTemplateRows = `${value}px 1fr 3fr`;
				value += 8;
				if (value >= this.listHeight) {
					container.style.gridTemplateRows = this.listHeight + 'px 1fr 3fr';
					list.style.overflowX = 'auto';
					this.listOpened = true;
					clearInterval(openId);
				}
			}, 10);
		},

		Close() {
			const container = document.getElementById('milestone-container');
			const list = document.getElementById('milestone-list');
			list.style.overflowX = 'hidden';

			let value = this.listHeight;
			const closeId = setInterval(() => {
				container.style.gridTemplateRows = `${value}px 1fr 3fr`;
				value -= 8;
				if (value <= 0) {
					container.style.gridTemplateRows = '0fr 1fr 3fr';
					this.listOpened = false;
					clearInterval(closeId);
				}
			}, 10);
		},

		Base() {
			const container = document.getElementById('milestone-container');
			const list = document.getElementById('milestone-list');

			container.style.height = '500px';
			container.style.gridTemplateRows = '0fr 1fr 3fr';
			list.style.overflowX = 'hidden';
			this.listOpened = false;
		},

		Update() {
			const categories = this.$store.getters.currentProject(this).categories;
			this.finishingCategory = categories[categories.length - 1].tag;
			this.notes.all = this.getNotes();
			this.notes.done = this.notes.all.filter(n => n.category == this.finishingCategory);
			this.notes.todo = this.notes.all.filter(n => n.category != this.finishingCategory);
		}
	},
	mounted() {
		this.Base();
		this.Update();
	}
}
</script>

<style scoped>
#milestone-container{
	display: grid;
	grid-template-columns: 1fr; 
	grid-template-rows: 0fr 1fr 3fr;
	height: 100%;
}

#milestone-list{
	grid-column: 1 / 2;
	grid-row: 1 / 2;
	overflow-y: hidden;
	overflow-x: auto;
}

#milestone-content{
	grid-column: 1 / 2;
	grid-row: 2 / 3;
	overflow-x: auto;
	overflow-y: hidden;
}

#milestone-side{
	grid-column: 1 / 2;
	grid-row: 3 / 4;
	overflow-y: hidden;
	overflow-x: hidden;
}
.milestone-btn{
	transition:100ms!important;
}

.milestone-btn:hover{
	border-radius: 10%!important;
}

.milestone-entry{
	min-width: 45px;
	height: 45px;
	cursor:pointer;
	border-radius: 50%;
	text-align: center;
	margin-top: 5px;
	padding-top: 15px;
	transition: 150ms;
}

.milestone-entry:hover{
	border-radius: 10%;
	background-color: grey!important;
}

.milestone-pointer{
	margin-left: 25px;
	margin-top: -12px;
	border-radius: 50%;
	height: 10px;
	width: 10px;
	opacity: 0;
	transition: 10ms;
}

.milestone-selected .milestone-pointer{
	opacity: 0.9;
}

.milestone-selected .milestone-entry{
	border-radius: 10%;
	background-color: grey!important;
}

</style>

<style>

</style>
