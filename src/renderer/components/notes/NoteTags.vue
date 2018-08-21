<template>
	<div>
		<v-chip class="tag" v-for="(entry, index) in tags" :key="index" small :class="entry.color">{{entry.tag}}</v-chip>
	</div>
</template>
<script>

export default {
	name: 'NoteTags',
	props: {
		tags: Array
	},
}
</script>

<style scoped>

</style>