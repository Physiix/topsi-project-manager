<template>
	<div>
		<v-card class="ma-2" :class="note.color" @contextmenu="show">
			<v-card-title class="py-2">{{note.title}}</v-card-title>
			<v-divider></v-divider>
			<v-card-text>{{note.description}}</v-card-text>
		</v-card>
	</div>
</template>
<script>

export default {
	name: 'Note',
	props: {
		note: Object
	},
	methods: {
		show(e) {
			e.preventDefault()
			this.$nextTick(() => {
				this.$store.commit('SetMenuData', {
					show: true,
					x: e.clientX,
					y: e.clientY
				})
			})
		}
	},
}
</script>

<style scoped>
.color_btn{
	border-radius: 0;
	min-width: 10px !important;
	max-height: 10px !important;
	margin: 0;
}
</style>