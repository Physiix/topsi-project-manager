<template>
	<div>
		<Settings />
		<v-list dense class="pt-0">
			<ProjectSettings v-if="displayProjects" />
			<div v-else>
				<v-list-tile v-for="item in items" :key="item.title" @click="item.action()">
					<v-list-tile-action>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-tile-action>
					<v-list-tile-content>
						<v-list-tile-title>{{ item.title }}</v-list-tile-title>
					</v-list-tile-content>
				</v-list-tile>
			</div>
		</v-list>
	</div>
</template>
<script>
import ProjectSettings from './ProjectSettings.vue'
import Settings from './Settings.vue'

export default {
	name: 'Content',
	components: {
		ProjectSettings,
		Settings
	},
	props: {

	},
	data() {
		return {
			items: [
				{
					icon: 'add',
					title: 'New Note',
					action: () => this.$store.commit('CreateNoteDialog')
				},
				{
					icon: 'edit',
					title: 'Edit Mode'
				}
			]
		}
	},
	computed: {
		displayProjects() {
			return this.$store.state.AppStore.openedProjectId == -1;
		}
	}
}
</script>

<style scoped>

</style>