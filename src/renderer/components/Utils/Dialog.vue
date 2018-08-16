<template>
	<v-card id="project-dialog" class="elevation-20">
		<slot></slot>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn flat class="ma-0" @click="Close">{{(cancel_text)?cancel_text:'Cancel'}}</v-btn>
			<v-btn flat class="ma-0" color="primary" @click="Save">{{(save_text)?save_text:'Save'}}</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>

export default {
	name: 'Dialog',
	props: {
		width: String,
		cancel_text: String,
		save_text: String
	},
	data() {
		return {
			/// Height of the tilebar
			top: 30
		}
	},
	methods: {
		/**
		 * When the users clicks on the Close button
		 */
		Close(event) {
			this.RollUp(() => this.$emit('close', event))
		},

		/**
		 * When the user clicks on the Save button.
		 */
		Save(event) {
			this.RollUp(() => this.$emit('save', event));
		},

		/**
		 * Roll-up the dialog, but does not close it. 
		 */
		RollUp(callback) {
			const element = document.getElementById('project-dialog');
			const height = element.getBoundingClientRect().height;
			let top = this.top;
			const id = setInterval(() => {
				top -= 8;
				element.style.top = top + 'px';
				if (top <= (-height)) {
					element.style.top = (-height) + 'px';
					callback();
					clearInterval(id);
				}
			})
		}
	},
	mounted() {
		const element = document.getElementById('project-dialog');

		const width = this.width;
		const offsetTop = this.top;
		const height = element.getBoundingClientRect().height;
		let top = -height;
		element.style.position = 'fixed';
		element.style.top = top + 'px';
		element.style.left = window.innerWidth / 2 - width / 2 + 'px';
		element.style.width = width + 'px';
		element.style.zIndex = 1;

		window.addEventListener('resize', () => element.style.left = window.innerWidth / 2 - width / 2 + 'px')

		const id = setInterval(() => {
			top += 8;
			element.style.top = top + 'px';
			if (top >= offsetTop) {
				element.style.top = '30px';
				clearInterval(id);
			}
		})
	}
}
</script>

<style scoped>
#project-dialog{
	position: fixed;
	border-radius: 0;
}
</style>