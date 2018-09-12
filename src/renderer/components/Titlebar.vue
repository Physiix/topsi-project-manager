<template>
	<div id="titlebar">
		<v-toolbar app :class="color" height="30" class="px-0" dark>
			<v-icon>project</v-icon>
			<v-spacer></v-spacer>
			{{this.$lang.Get('projectName')}} {{projectName}}
			<v-spacer></v-spacer>
			<v-btn flat class="titlebar-btn mx-0" @click="minimize">
				<svg width="9" height="9" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11 4.399V5.5H0V4.399h11z" fill="#fff" />
				</svg>
			</v-btn>
			<v-btn flat class="titlebar-btn mx-0" @click="maximise">
				<svg v-if="!maximized" width="9" height="9" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11 0v11H0V0h11zM9.899 1.101H1.1V9.9H9.9V1.1z" fill="#fff" />
				</svg>
				<svg v-else width="9" height="9" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11 8.798H8.798V11H0V2.202h2.202V0H11v8.798zm-3.298-5.5h-6.6v6.6h6.6v-6.6zM9.9 1.1H3.298v1.101h5.5v5.5h1.1v-6.6z" fill="#fff" />
				</svg>
			</v-btn>
			<v-btn flat class="titlebar-btn mx-0 close-btn" @click="close">
				<svg width="9" height="9" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6.279 5.5L11 10.221l-.779.779L5.5 6.279.779 11 0 10.221 4.721 5.5 0 .779.779 0 5.5 4.721 10.221 0 11 .779 6.279 5.5z" fill="#fff" />
				</svg>
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
		},

		/**
		 * Get the name of the project if opened.
		 * Empty string if not.
		 */
		projectName() {
			const projectName = this.$store.getters.projectName;
			if (projectName != null && projectName.length > 0) return ` | ${projectName}`;
			return '';
		}
	},

	methods: {
		close() {
			this.window.close();
		},

		maximise() {
			if (this.maximized) {
				this.window.unmaximize();
				this.maximized = false;
			}
			else {
				this.window.maximize();
				this.maximized = true;
			}
		},

		minimize() {
			this.window.minimize();
		},
	},

	mounted() {
		const titlebar = document.getElementById('titlebar');
		titlebar.style.position = 'fixed';
		titlebar.style.left = '0';
		titlebar.style.top = '0';
		titlebar.style.height = '30px';
		titlebar.style.width = window.innerWidth + 'px';
		titlebar.style.zIndex = 10;
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
	min-width:46px!important;
	max-width:46px!important;
	height:30px;
}

#titlebar {
  -webkit-user-select: none;
  -webkit-app-region: drag;
}

.titlebar-btn {
  -webkit-app-region: no-drag;
  cursor:auto;
  border-radius:0;
}

.close-btn:hover{
	background-color:rgba(255, 0, 0, 0.9);
	color: white;
}

</style>