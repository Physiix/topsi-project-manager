<template>
	<div>
		<v-dialog v-model="showSettings" max-width="500">
			<v-tabs v-model="active" fixed centered dark class="secondary" dark>
				<v-tab v-for="(tab, index) in tabs" :key="index" ripple>
					{{tab}}
				</v-tab>
				<v-tab-item v-for="(tab, index) in tabs " :key="index" :id="'tab-' + index">
					<GeneralSettings v-if="tab=='General' " class="item " />
					<GitSettings v-if="tab=='Git' " class="item " />
				</v-tab-item>
			</v-tabs>
		</v-dialog>
	</div>
</template>
<script>
import GeneralSettings from './GeneralSettings.vue'
import GitSettings from './GitSettings.vue'

export default {
	name: 'Settings',
	components: {
		GeneralSettings,
		GitSettings
	},
	data() {
		return {
			tabs: [
				'General',
				'Git'
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