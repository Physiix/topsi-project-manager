<template>
	<v-navigation-drawer v-model="drawer" floating temporary right width="150" height="100%" fixed style="zIndex:5;opacity:0.9; padding-top:35px;">
		<div id="milestone-drawer">
			<v-card v-for="i in 5" :key="i" class="mx-1 py-3 primary milestone text-xs-center" dark :class="selected==i?'milestone-selected':''" @click.native="Select(i)" >
				Milestone{{i}}
			</v-card>
			<v-card id="add-milestone-card" color="transparent" class="mx-1 py-3 milestone text-xs-center elevation-0">
				<v-icon color="primary">add</v-icon>
			</v-card>
			<FloatingDiv activator-id="add-milestone-card" v-on:action="" right dark>
				<v-card>
					<v-toolbar class="px-2" color="secondary" height="55">
						
					</v-toolbar>
				</v-card>
			</FloatingDiv>
		</div>
	</v-navigation-drawer>
</template>
<script>

export default {
	name: 'MilestonesList',
	data() {
		return {
			selected: 1,
		}
	},
	computed: {
		drawer: {
			get() {
				return this.$store.getters.isMilestonesList;
			},
			set(value) {
				this.$store.commit('ToggleMilestonesList', value);
			}
		}
	},
	methods: {
		Select(index) {
			this.selected = index;
		}
	},
}
</script>

<style scoped>
.milestone{
	cursor: pointer;
	transition: 150ms;
	border-radius: 0;
	margin-top:0;
	margin-bottom:1px;;
}

.milestone-selected{
	/* border-radius: 10%!important; */
	background-color: grey!important;
	margin-top:5px;
	margin-bottom:5px;
}

.milestone:hover{
	/* border-radius: 10%; */
}

</style>

<style>


#milestone-drawer {
	overflow-y: scroll;
	overflow-x: hidden;
	background-color: rgba(0,0,0,0);
	-webkit-background-clip: text;
	transition: background-color .2s;
}
#milestone-drawer:hover {
	background-color: rgba(102, 102, 102, 0.5);  
}
#milestone-drawer::-webkit-scrollbar-thumb {
	background-color: inherit;
}
</style>
