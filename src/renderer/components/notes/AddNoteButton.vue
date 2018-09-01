<template>
	<div>
		<v-btn fab small bottom right fixed color="primary" @click="AddNote" class="elevation-10">
			<v-icon>add</v-icon>
		</v-btn>
	</div>
</template>
<script>

export default {
	name: 'AddNoteButton',
	methods: {
		AddNote() {
			this.$store.dispatch('ToggleDialog', 'createNote');
		}
	}
}
</script>

<style scoped>

</style>