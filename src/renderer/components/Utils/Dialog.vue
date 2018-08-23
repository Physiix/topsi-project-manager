<template>
	<v-card id="project-dialog" class="elevation-20" :class="color" :height="height">
		<slot></slot>
		<v-card-actions style="position:absolute;bottom:0px;right:0px;">
			<v-spacer></v-spacer>
			<v-btn v-if="!disableCancel" :flat="!cancelRaised" class="ma-0" :color="(cancelColor)?cancelColor:''" @click="Close">{{(cancelText)?cancelText:'Cancel'}}</v-btn>

			<v-btn v-if="!disableAccept" :flat="!acceptRaised" class="ma-0" :color="(acceptColor)?acceptColor:'primary'" @click="Accept">{{(acceptText)?acceptText:'Save'}}</v-btn>
		</v-card-actions>
	</v-card>
</template>
<script>

export default {
	name: 'Dialog',
	props: {
		width: String,
		height: String,
		cancelText: String,
		acceptText: String,
		disableAccept: Boolean,
		disableCancel: Boolean,
		acceptColor: String,
		cancelColor: String,
		acceptRaised: Boolean,
		cancelRaised: Boolean
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
		 * When the user clicks on the accept button.
		 */
		Accept(event) {
			this.RollUp(() => this.$emit('accept', event));
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
	computed: {
		color() {
			return (!this.$store.getters.IsDarkMode) ? 'grey lighten-2' : '';
		}
	},
	mounted() {
		const maxHeight = 0.9;
		const actionsOffset = 85;
		const element = document.getElementById('project-dialog');

		const width = this.width;
		const offsetTop = this.top;
		const height = element.getBoundingClientRect().height;
		let top = -height;
		element.style.position = 'fixed';
		element.style.top = top + 'px';
		element.style.left = window.innerWidth / 2 - width / 2 + 'px';
		element.style.maxHeight = window.innerHeight * maxHeight + 'px';

		element.style.width = width + 'px';
		element.style.zIndex = 1;
		element.style.minHeight = height + actionsOffset + 'px';

		window.addEventListener('resize', () => {
			element.style.left = window.innerWidth / 2 - width / 2 + 'px';
			element.style.maxHeight = window.innerHeight * maxHeight + 'px';
		})

		const id = setInterval(() => {
			top += 26;
			element.style.top = top + 'px';
			if (top >= offsetTop) {
				element.style.top = '30px';
				clearInterval(id);
			}
		}, 10)
	}
}
</script>

<style scoped>
#project-dialog{
	position: fixed;
	border-radius: 0;
	overflow-y: auto;	
}

#project-dialog button{
	border-radius:  0;
}

</style>