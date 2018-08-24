<template>
	<div>
		<Tooltip top content="Add a new tag">
			<v-list-tile id="tags-button" @click="">
				<v-list-tile-action>
					<v-icon>
						fa-tags
					</v-icon>
				</v-list-tile-action>
			</v-list-tile>
		</Tooltip>
		<FloatingDiv activator-id="tags-button" v-on:action="" width="500" dark left>
			<v-toolbar color="secondary" dark class="px-2 elevation-0">
				<v-text-field v-model="tag" @keyup.enter.native="AddTag"></v-text-field>
				<v-btn flat @click="AddTag">Add</v-btn>
			</v-toolbar>
			<ColorPicker width="500" padding="20" v-model="color"></ColorPicker>
			<v-container>
				<v-chip v-for="(entry, index) in tags" :key="index" small :class="entry.color">{{entry.tag}}</v-chip>
			</v-container>
		</FloatingDiv>
	</div>
</template>
<script>

export default {
	name: 'TagsSettings',
	data() {
		return {
			tag: '',
			color: ''
		}
	},
	computed: {
		tags() {
			return this.$store.getters.getProjectTags;
		}
	},
	methods: {
		AddTag() {
			this.$store.commit('AddTag', {
				tag: this.tag,
				color: this.color
			});
			this.tag = '';
			this.color = ''
		}
	},
}
</script>

<style scoped>

</style>