<template>
	<div class="text-xs-center">
		<v-dialog v-model="dialog" width="600" persistent>
			<v-card>
				<v-card-title class="headline justify-center" dark primary-title>
					{{this.$lang.Get('helperTitle')}}
				</v-card-title>

				<v-card-text class="text-xs-left">
					<div v-for="(shortcut, index) in shortcuts" :key="index">
						<strong>{{shortcut.key}}</strong> - {{shortcut.description}} <br />
					</div>
				</v-card-text>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="primary" flat @click="Close">
						{{this.$lang.Get('close')}}
					</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script>

export default {
	name: 'Helper',
	data() {
		return {
			dialog: true,
			shortcuts: [{
				key: 'CTRL+D',
				description: 'Show/Hide the helper page.'
			}, {
				key: 'CTRL+F',
				description: 'Show/Hide the search bar.'
			}, {
				key: 'CTRL+L',
				description: 'Show the milestones list.'
			},
			{
				key: 'CTRL+N',
				description: 'Create a new Note.'
			},]
		}
	},
	methods: {
		Close() {
			this.$store.commit('ToggleShowHelper');
		}
	}
}
</script>

<style scoped>

</style>


