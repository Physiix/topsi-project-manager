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
import { EventsManager } from '../../core/EventManager';

export default {
	name: 'SearchBar',
	computed: {
		search: {
			get() {
				return this.$store.getters.getSearchContent;
			},
			set(value) {
				return this.$store.commit('SetSearchContent', value);
			}
		}
	},
	methods: {
		Close() {
			this.$store.commit('ToggleSearch');
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

		const clickListener = (event) => {
			const rect = card.getBoundingClientRect();
			if (event.clientX > rect.left + rect.width ||
				event.clientX < rect.left ||
				event.clientY > rect.top + rect.height ||
				event.clientY < rect.top) {
				this.$store.commit('ToggleSearch')
				window.removeEventListener('click', clickListener);
			}
		}
		window.addEventListener('click', clickListener)
	}
}
</script>

<style scoped>

</style>