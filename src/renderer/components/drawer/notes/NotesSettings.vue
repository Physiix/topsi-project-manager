<template>
	<div>
		<v-list dense class="pt-0 transparent" dark>
			<div v-for="item in items" :key="item.title">
				<Tooltip :content="item.hint" right>
					<v-list-tile @click="item.action()">
						<v-list-tile-action>
							<v-icon :class="item.class?item.class:''" :style="item.style?item.style:''">{{ item.icon }}</v-icon>
						</v-list-tile-action>
					</v-list-tile>
				</Tooltip>
			</div>
			<!-- Note yet ready	 -->
			<!-- <MilestonesSettings /> -->
			<TagsSettings />
			<v-divider></v-divider>
		</v-list>
		<div style="width:25px;margin-left:13px;cursor:pointer;position:absolute;bottom:0;">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" transform="rotate(180)">
				<title>DockBottom_16x</title>
				<path class="icon-vs-bg" d="M1,2V14H15V2ZM14,9H2V3H14Z" fill="#fff" />
			</svg>
		</div>
	</div>

</template>
<script>
import MilestonesSettings from './MilestonesSettings.vue'
import TagsSettings from './TagsSettings.vue'

export default {
	name: 'NotesSettings',
	components: {
		TagsSettings,
		MilestonesSettings
	},
	props: {

	},
	data() {
		return {
			items: [
				{
					icon: 'arrow_back',
					title: '',
					hint: this.$lang.Get('backToProjects'),
					action: () => {
						// Back to the main menu.
						this.$store.dispatch('OpenProject', null);
					}
				},
				{
					icon: 'search',
					title: 'Search',
					hint: this.$lang.Get('searchInNotes'),
					action: () => { this.$store.dispatch('ToggleDialog', 'searchDialog'); }
				},
				{
					icon: 'add',
					title: 'New Note',
					hint: this.$lang.Get('addNewNote'),
					style: 'margin-left:-2px;',
					action: () => this.$store.dispatch('ToggleDialog', 'createNote')
				},
				{
					icon: 'fa-edit',
					title: 'Edit Project',
					class: 'pr-2',
					hint: this.$lang.Get('editProject'),
					action: () => this.$store.dispatch('ToggleDialog', 'updateProject')
				},
				{
					icon: 'fa-list-ol',
					title: 'Milestones',
					style: 'margin-left:-2px;',
					hint: this.$lang.Get('milestones'),
					action: () => this.$store.dispatch('ToggleDialog', 'milestonesList')
				}
			]
		}
	},
	computed: {
	},
	methods: {
	},
}
</script>

<style scoped>

</style>