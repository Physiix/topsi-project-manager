<template>
	<v-chip ref="tag" class="tag" :color="color?color:''" small :text-color="textColor?textColor:''">
		<strong>
			<slot></slot>
		</strong>
	</v-chip>
</template>
<script>

export default {
	name: 'Tag',
	props: {
		color: String,
		textColor: String
	},
	data() {
		return {

		}
	},
	mounted() {
		const element = this.$refs.tag.$el;
		element.style.zIndex = 0;
	}
}
</script>

<style >
.tag{
	border-radius:8%;
	height: 20px;
}
.v-chip__content{
	padding: 5px!important;
}
</style>