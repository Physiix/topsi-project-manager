<template>
	<Dialog v-if="showSettings" width="500" v-on:close="showSettings = false" disable-accept cancel-text="Close">
		<v-tabs v-model="active" fixed centered>
			<v-tab v-for="(tab, index) in tabs" :key="index" ripple>
				{{tab}}
			</v-tab>
			<v-tab-item v-for="(tab, index) in tabs " :key="index" :id="'tab-' + index">
				<GeneralSettings v-if="tab=='General' " class="item " />
				<div v-if="tab=='About' " class="item white">
					<v-card class="elevation-0">
						<v-card-text class="justify-center text-xs-center">
							Topsi Project Manager is a simple kanban board software built with electron and vuejs. It supports all three major platforms (Windows, Linux and OSX). It's free and Open Source under the GPL V3 Clause.
						</v-card-text>
					</v-card>
				</div>
			</v-tab-item>
		</v-tabs>
	</Dialog>
</template>
<script>
import GeneralSettings from './GeneralSettings.vue'

export default {
	name: 'Settings',
	components: {
		GeneralSettings,
	},
	data() {
		return {
			tabs: [
				'General',
				'About'
			],
			active: 0
		}
	},
	computed: {
		showSettings: {
			set(value) {
				this.$store.commit('ShowSettings', value);
			},

			get() {
				return this.$store.state.AppStore.dialogs.showSettings;
			}
		}
	},
	methods: {

	},
}
</script>

<style scoped>
.item{
	 min-height:300px;
}
</style>