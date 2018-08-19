<template>
	<v-card :id="'note-'+note.id" class="note ma-2" :class="note.color" @contextmenu="show" @dblclick="Open" :dark="dark">
		<v-card-title class="py-2 pr-0">
			<strong>{{note.title}}</strong>
			<v-spacer></v-spacer>
			<v-btn small icon class="ma-0" @click="Edit">
				<v-icon style="font-size:16px;">
					edit
				</v-icon>
			</v-btn>
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
		},

		Edit() {
			this.$store.commit('SetUpdatedNote', this.note);
			this.$store.commit('UpdateNoteDialog');
		},

		Open() {
			this.$store.commit('SetOpenedNote', this.note);
			this.$store.commit('OpenNoteDialog');
		}
	},
	computed: {
		dark() {
			const darkMode = this.$store.state.AppStore.darkMode && this.note.color == '';
			return (darkMode) ? true : (this.note.color.includes('white--text')) ? true : false;
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

.note-btn{
	min-width:20px!important;
	max-width:20px!important;
	height:20px;
}

.v-card__text img{
	width: 100%;
}
</style>