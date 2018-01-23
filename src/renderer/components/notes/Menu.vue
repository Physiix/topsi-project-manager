<template>
	<div>
		<v-menu offset-y v-model="showMenu" absolute :position-x="x" :position-y="y">
			<v-list>
				<v-list-tile v-for="item in items" :key="item.title" @click="">
					<v-list-tile-title>{{ item.title }}</v-list-tile-title>
				</v-list-tile>
			</v-list>
		</v-menu>
	</div>
</template>
<script>

export default {
	name: 'Menu',
	components: {

	},
	props: {

	},
	data() {
		return {
			items: [
				{ title: 'Edit' },
				{ title: 'Archieve' },
				{ title: 'Remove' },
			]
		}
	},
	computed: {
		showMenu: {
			get() {
				return this.$store.state.AppStore.menu.show;
			},

			set(value) {
				this.$store.commit('SetShowMenu', value);
			}
		},

		x: {
			get() {
				return this.$store.state.AppStore.menu.x;
			},

			set(value) {
				this.$store.commit('SetMenuX', value);
			}
		},

		y: {
			get() {
				return this.$store.state.AppStore.menu.y;
			},

			set(value) {
				this.$store.commit('SetMenuY', value);
			}
		},
	},
	methods: {

	},
}
</script>

<style scoped>

</style>