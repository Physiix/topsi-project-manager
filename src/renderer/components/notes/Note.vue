<template>
	<v-card :id="'note-'+note.id" class="note ma-2" :class="note.color" @contextmenu="show">
		<v-card-title class="py-2 pr-0">
			{{note.title}}

		</v-card-title>
		<v-divider></v-divider>
		<v-card-text v-html="note.description"></v-card-text>
	</v-card>
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

<style>
.color_btn{
	border-radius: 0;
	min-width: 10px !important;
	max-height: 10px !important;
	margin: 0;
}

.note{
	cursor: pointer;
	transition: 0.1s;
}
.note:hover{
	opacity: 0.8;
}

.v-card__text img{
	width: 100%;
}
</style>