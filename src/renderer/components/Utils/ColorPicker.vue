<template>
	<div ref="color_picker" class="color-picker">
		<v-layout row ref="layout">
			<v-btn flat block v-for="(color, i) in colors" :class="color + ' ' + ((color == selected)?'elevation-5':'')" :key="'color'+i" class="color-picker-btn" v-text="(color.length == 0)?'default':''" @click="Select(color, i)">
			</v-btn>
		</v-layout>
	</div>
</template>
<script>

export default {
	name: 'ColorPicker',
	props: {
		padding: String,
		width: String,
		value: String
	},
	data() {
		return {
			// To add support for a new color, just add a new line to the array.
			colors: [
				'red white--text',
				'blue white--text',
				'orange black--text',
				'green white--text',
				'purple white--text',
				'indigo white--text',
				'pink white--text',
				'grey black--text',
				'deep-purple white--text',
				'cyan white--text',
				'teal white--text',
				'light-green white--text',
				'yellow white--text',
				'amber white--text',
				'deep-orange white--text',
				'brown white--text',
				'blue-grey white--text',
				'',
			],
			selected: null
		}
	},
	methods: {
		/**
		 * Iterate trough all the buttons, and apply visual changes to the selected button.
		 * Emits an event with the selected color.
		 */
		Select(color, index) {
			this.selected = color;
			const btns = document.getElementsByClassName('color-picker-btn')
			for (let i = 0; i < btns.length; i++) {
				// Default values for each buttons
				let height = 10;
				let top = 0;


				const el = btns.item(i);

				// Change the default values for the selected button
				if (index == i) {
					height = 14;
					top = -2;
				}

				// Apply transform to the selected button
				el.style.top = top + 'px';
				el.style.height = height + "px";
				el.style.maxHeight = height + "px";
				el.style.minHeight = height + "px";
			}

			// Emit an event with the selected color.
			this.$emit('color-selected', color);
			this.$emit('input', color);
		}
	},
	mounted() {
		// Width is required.
		if (!this.width) throw new Error("Width is required for the TimePicker component");

		// Get the buttons, where each button represents a color.
		const btns = document.getElementsByClassName('color-picker-btn');

		// Calculate the padding and width.
		const padding = this.padding ? this.padding : 0;
		const width = this.width - padding * 2;

		// Iterate trough all the buttons/colors, and apply the width
		for (let i = 0; i < btns.length; i++) {
			btns.item(i).style.width = width / this.colors.length + 'px';
			btns.item(i).style.maxWidth = width / this.colors.length + 'px';
			btns.item(i).style.minWidth = width / this.colors.length + 'px';
		}

		// Apply the padding to the buttons's parent.
		this.$refs.layout.style.paddingLeft = padding + 'px';
	}
}
</script>

<style scoped>

.color-picker-btn{
	height: 10px;
	padding: 0;
	margin: 0;
	margin-bottom: 10px;
	border-radius: 0;
	font-size: 5px;
}

.color-picker{
	height: 25px!important;
}

</style>