<template>
	<div ref=container>
		<v-card ref=card width="500" class="elevation-24" dark @keyup.esc.native="Close" @keyup.enter.native="Close">
			<v-card-title class="py-0">
				<v-text-field v-model="search" autofocus :placeholder="this.$lang.Get('searchLabel')"></v-text-field>
			</v-card-title>
		</v-card>
	</div>
</template>
<script>
import Utils from '../../core/Utils';

export default {
	name: 'SearchBar',
	computed: {
		search: {
			get() {
				return this.$store.getters.searchContent;
			},
			set(value) {
				return this.$store.commit('SetSearchContent', value);
			}
		}
	},
	methods: {
		Close() {
			this.$store.dispatch('ToggleDialog', 'searchDialog');
		}
	},
	mounted() {
		const container = this.$refs.container;
		const bg = this.$refs.search;
		const card = this.$refs.card.$el;

		container.style.position = 'fixed';
		container.style.zIndex = 5;

		card.style.position = 'fixed'
		card.style.left = window.innerWidth / 2 - 250 + 'px';
		window.addEventListener('resize', () => card.style.left = window.innerWidth / 2 - 250 + 'px');
		card.style.top = '100px';

		Utils.ClickOutside(card, () => {
			this.$store.dispatch('ToggleDialog', 'searchDialog');
		});
	}
}
</script>

<style scoped>

</style>