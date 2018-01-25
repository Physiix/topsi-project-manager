<template>
	<div>
		<v-card class="ma-2" :class="note.color" @contextmenu="show">
			<v-card-title class="py-0 pr-0">{{note.title}}
				<v-spacer></v-spacer>
				<v-btn class="mx-0" :dark="dark" flat icon small v-if="note.category == 'done' || note.category == 'in_progress'" @click="MoveLeft">
					<v-icon class="note_icon">keyboard_arrow_left</v-icon>
				</v-btn>
				<v-btn class="mx-0" :dark="dark" flat icon small v-if="note.category == 'todo' || note.category == 'in_progress'" @click="MoveRight">
					<v-icon class="note_icon">keyboard_arrow_right</v-icon>
				</v-btn>
			</v-card-title>
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
					y: e.clientY,
					note: this.note
				})
			})
		},

		MoveRight() {
			this.$store.commit('MoveNoteRight', this.note);
		},

		MoveLeft() {
			this.$store.commit('MoveNoteLeft', this.note);
		}
	},
	computed: {
		dark() {
			const darkMode = this.$store.state.AppStore.darkMode;
			return (darkMode) ? true : (this.note.color == '') ? false : true;
		}
	}
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