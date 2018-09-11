<template>
	<v-layout row justify-center>
		<v-dialog value="true" persistent max-width="290">
			<v-card>
				<v-card-title class="headline">{{title}}</v-card-title>
				<v-card-text>{{message}}</v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn flat @click.native="Cancel">{{cancelMsg?cancelMsg:$lang.Get('cancel')}}</v-btn>
					<v-btn :color="acceptColor?acceptColor:'primary'" style="border-radius:0;" @click.native="Accept">{{acceptMsg?acceptMsg:$lang.Get('accept')}}</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-layout>
</template>
<script>

export default {
	name: 'ConfirmDialog',
	props: {
		title: String,
		message: String,
		acceptMsg: String,
		cancelMsg: String,
		acceptColor: String
	},
	methods: {
		Cancel() {
			this.$emit('cancel');
		},

		Accept() {
			this.$emit('accept');
		}
	}
}
</script>

<style scoped>

</style>