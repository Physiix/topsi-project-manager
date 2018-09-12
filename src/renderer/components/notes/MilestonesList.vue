<template>
	<v-navigation-drawer v-model="drawer" floating temporary right width="150" height="100%" fixed style="zIndex:5;opacity:0.9; padding-top:35px;">
		<div id="milestone-drawer">
			<v-card v-for="(milestone, i) in milestones" :key="i" class="mx-1 py-3  milestone text-xs-center" dark :class="selected==i?'milestone-selected':''" @click.native="Select(i)">
				{{milestone.title}}
			</v-card>
			<v-card id="add-milestone-card" color="transparent" class="mx-1 py-3 milestone text-xs-center elevation-0" @click.native="AddMilestone">
				<v-icon color="primary">add</v-icon>
			</v-card>
			<v-card ref="flash_input" width="500" class="secondary elevation-24" dark>
				<v-card-title class="py-0">
					<v-text-field ref="milestone_input" v-model="milestoneName" autofocus :placeholder="this.$lang.Get('newMilestoneLabel')" @keyup.esc.native="Hide"></v-text-field>
				</v-card-title>
			</v-card>
		</div>
	</v-navigation-drawer>
</template>
<script>
import Utils from '../../../core/Utils';

export default {
	name: 'MilestonesList',
	data() {
		return {
			milestoneName: ''
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
		},

		selected: {
			get() {
				return this.$store.getters.currentMilestoneId;
			},
			set(value) {
				this.$store.dispatch('SetProjectMilestone', {
					projectId: this.$store.getters.openedProjectId,
					milestoneId: value
				})
			}
		},
		milestones() {
			return this.$store.getters.milestones;
		}
	},
	methods: {
		Select(index) {
			this.selected = index;
		},

		AddMilestone() {
			const element = this.$refs.flash_input.$el;
			element.style.position = 'fixed';
			element.style.visibility = 'visible';

			element.style.top = '100px';
			Utils.FocusTextField(this.$refs.milestone_input.$el);

			Utils.ClickOutsideOrKeyPress(element, (event, type) => {
				element.style.visibility = 'hidden';
				if (type == 'keyup') {
					console.log(this.milestoneName)
					this.$store.dispatch('CreateMilestone', {
						projectId: this.$store.getters.openedProjectId,
						name: this.milestoneName
					});
					this.milestoneName = '';
				}
			}, { key: 'Enter' });
		},

		Hide() {
			this.milestoneName = '';
			this.$refs.flash_input.$el.style.visibility = 'hidden';
		}
	},
	mounted() {
		const element = this.$refs.flash_input.$el;
		element.parentNode.removeChild(element);
		document.querySelector('body').appendChild(element);
		element.style.position = 'fixed';
		element.style.visibility = 'hidden';
		element.style.height = '100px';
		element.style.zIndex = 7;
		element.style.left = window.innerWidth / 2 - 250 + 'px';
		window.addEventListener('resize', () => element.style.left = window.innerWidth / 2 - 250 + 'px');
	}
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
	background-color: #2196F3!important;
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
