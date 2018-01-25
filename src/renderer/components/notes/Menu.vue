<template>
	<div>
		<v-menu offset-y v-model="showMenu" absolute :position-x="x" :position-y="y">
			<v-list>
				<v-list-tile v-for="item in items" :key="item.title" @click="item.action()">
					<v-list-tile-title>{{ item.title }}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
	</div>
</template>
<script>

export default {
	name: 'Menu',
	data() {
		return {
			items: [
				{
					title: 'Edit',
					action: () => this.$store.commit('UpdateNoteDialog')
				},
				{ title: 'Archieve' },
				{
					title: 'Remove',
					action: () => this.$store.commit('RemoveNote')
				},
			]
		}
	},
	computed: {
		showMenu: {
			get() {
				return this.$store.state.NotesStore.menu.show;
			},

			set(value) {
				this.$store.commit('SetShowMenu', value);
			}
		},

		x: {
			get() {
				return this.$store.state.NotesStore.menu.x;
			},

			set(value) {
				this.$store.commit('SetMenuX', value);
			}
		},

		y: {
			get() {
				return this.$store.state.NotesStore.menu.y;
			},

			set(value) {
				this.$store.commit('SetMenuY', value);
			}
		},
	},
}
</script>

<style scoped>

</style>