<template>
	<div id="titlebar">
		<v-toolbar app :class="color" height="30" class="px-0" dark @mousedown="moveWindow">
			<v-spacer></v-spacer>
			Project Manager
			<v-spacer></v-spacer>
			<v-btn flat class="titlebar-btn mx-0" @click="minimize">
				<v-icon class="pb-3">minimize</v-icon>
			</v-btn>
			<v-btn flat class="titlebar-btn mx-0" @click="maximise">
				<v-icon>border_outer</v-icon>
			</v-btn>
			<v-btn flat class="titlebar-btn mx-0" @click="close">
				<v-icon>close</v-icon>
			</v-btn>
		</v-toolbar>
	</div>
</template>
<script>

export default {
	name: 'Titlebar',
	data() {
		return {
			maximized: false,
			window: null,
		}
	},
	computed: {
		color() {
			const baseColor = this.$store.getters.appColor;
			return baseColor + ' darken-2';
		}
	},

	methods: {
		close() {
			this.window.close();
		},

		maximise() {
			if (this.isMaximized) {
				this.window.unmaximize();
				this.isMaximized = false;
			} else {
				this.window.maximize();
				this.isMaximized = true;
			}

		},

		minimize() {
			this.window.minimize();
		},

		moveWindow(event) {
			// console.log(event);
		},

		startDrag() {
			// const titlebar = document.getElementById('titlebar');
			const mouseOver = (event) => {
				const remote = require('electron').remote;
				remote.getCurrentWindow().setmov
			}
			window.addEventListener('mousemove', mouseOver)

			window.addEventListener('mouseup', () => {
				console.log('up')
				window.removeEventListener('mousemove', mouseOver)
			})
		}
	},

	mounted() {
		const titlebar = document.getElementById('titlebar');
		titlebar.style.position = 'fixed';
		titlebar.style.left = '0';
		titlebar.style.top = '0';
		titlebar.style.height = '30px';
		titlebar.style.width = window.innerWidth + 'px';
		window.addEventListener('resize', () => { titlebar.style.width = window.innerWidth + 'px'; })
	},

	created() {
		this.window = require('electron').remote.getCurrentWindow();
		this.maximized = this.window.isMaximized();

	}
}
</script>

<style>
.v-toolbar__content{
	padding: 0;
}
.titlebar-btn{
	min-width:35px!important;
	max-width:35px!important;
}

#titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.titlebar-btn {
  -webkit-app-region: no-drag;
}

</style>