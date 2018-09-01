<template>
	<v-card :id="'note-'+note.id" class="note ma-2" :class="note.color" @dblclick="Open" :dark="dark">
		<v-card-title class="py-2 pt-3 pr-0">
			<v-layout row>
				<div class="blue--text pr-1">
					<strong>#{{note.id}}</strong>
				</div>
				<h4>{{note.title}}</h4>
				<v-spacer></v-spacer>
				<v-btn small icon class="ma-0" @click="Edit">
					<v-icon style="font-size:16px;">
						edit
					</v-icon>
				</v-btn>
			</v-layout>
		</v-card-title>
		<v-divider></v-divider>
		<NoteTags class="px-2" :note-color="note.color" :tags="note.tags" />
		<v-card-text v-html="note.description"></v-card-text>
	</v-card>
</template>
<script>
import NoteTags from './NoteTags.vue'

export default {
	name: 'Note',
	components: {
		NoteTags
	},
	props: {
		note: Object
	},
	methods: {
		Edit() {
			this.$store.dispatch('EditNote', this.note);
		},

		Open() {
			this.$store.dispatch('VisualizeNote', this.note);
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

.tag{
	border-radius:5%!important;
	z-index: 0;
}
</style>