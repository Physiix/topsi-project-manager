<template>
	<v-navigation-drawer v-model="drawer" temporary right width="200" height="100%" fixed style="zIndex:5">
	</v-navigation-drawer>
</template>
<script>

export default {
	name: 'MilestonesList',
	computed: {
		drawer: {
			get() {
				return this.$store.getters.isMilestonesList;
			},
			set(value) {
				console.log(value)
				this.$store.commit('ToggleMilestonesList', value);
			}
		}
	},
	methods: {

	},
}
</script>

<style scoped>

</style>