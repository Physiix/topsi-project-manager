<template>
	<Dialog v-if="showSettings" width="500" v-on:close="showSettings = false" disable-accept :cancel-text="$lang.Get('close')">
		<v-tabs v-model="active" fixed centered>
			<v-tab v-for="(tab, index) in tabs" :key="index" ripple>
				{{tab}}
			</v-tab>
			<v-tab-item v-for="(tab, index) in tabs " :key="index" :id="'tab-' + index">
				<GeneralSettings v-if="tab==$lang.Get('general')" class="item " />
				<div v-if="tab==$lang.Get('about')" class="item">
					<v-card class="elevation-0">
						<v-card-text class="justify-center text-xs-center" v-html="$lang.Get('aboutContent')">

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
				this.$lang.Get('general'),
				this.$lang.Get('about')
			],
			active: 0
		}
	},
	computed: {
		showSettings: {
			set(value) {
				this.$store.dispatch('ToggleDialog', 'showSettings');
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