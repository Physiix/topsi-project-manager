<template>
	<div ref="tags">
		<v-chip class="tag" v-for="(entry, index) in tags" :key="index" small :class="color(entry.color)">{{entry.tag}}</v-chip>
	</div>
</template>
<script>
import colors from 'vuetify/es5/util/colors'
import { colorToInt, intToHex } from 'vuetify/es5/util/colorUtils'

export default {
	name: 'NoteTags',
	props: {
		tags: Array,
		noteColor: String
	},
	methods: {
		color(tagColor) {
			if (this.noteColor == null) return tagColor;
			const noteColorName = this.noteColor.substr(0, tagColor.indexOf(' '));
			const colorName = tagColor.substr(0, tagColor.indexOf(' '));
			return colorName != noteColorName ? tagColor : '';
		}
	},
}
</script>

<style scoped>

</style>