<template>
	<div ref="floating_div">
		<v-card :dark="dark" class="elevation-0" :color="(color)?color:''">
			<slot ref="floating_content" :dark="dark"></slot>
		</v-card>
	</div>
</template>

<script>
import colors from 'vuetify/es5/util/colors'
import Utils from '../../../core/Utils';
export default {
	name: 'FloatingDiv',
	props: {
		activatorId: String,
		width: String,
		height: String,
		dark: Boolean,
		indicatorColor: String,
		left: Boolean,
		top: Boolean,
		color: String,
		releaseKey: String,
	},

	data() {
		return {}
	},

	mounted() {
		const button = document.getElementById(this.activatorId);
		const drawer = this.$refs.floating_div;
		drawer.style.position = 'fixed';
		drawer.style.opacity = '0';
		drawer.style.visibility = 'collapse';
		button.onclick = () => {
			if (document.getElementById("floating-triangle-id")) return;

			const triangle = document.createElement('div');
			const rect = button.getBoundingClientRect();

			triangle.id = "floating-triangle-id";
			triangle.style.position = 'fixed';
			triangle.style.zIndex = 3;
			triangle.style.width = '0';
			triangle.style.height = '0';

			if (this.top) {
				triangle.style.borderLeft = '10px solid transparent';
				triangle.style.borderRight = '10px solid transparent';
				if (this.dark) triangle.style.borderBottom = '10px solid #424242';
				else triangle.style.borderBottom = '10px solid #fff';
				if (this.indicatorColor) triangle.style.borderBottom = `10px solid ${colors[this.indicatorColor].base}`;
				triangle.style.left = rect.left + rect.width / 2 - 10 + 'px';
				triangle.style.top = rect.top + rect.height + 'px';
			} else {
				triangle.style.borderTop = '10px solid transparent';
				triangle.style.borderBottom = '10px solid transparent';
				if (this.dark) triangle.style.borderRight = '10px solid #424242';
				else triangle.style.borderRight = '10px solid #fff';
				if (this.indicatorColor) triangle.style.borderRight = `10px solid ${colors[this.indicatorColor].base}`;
				triangle.style.left = rect.left + rect.width + 5 + 'px';
				triangle.style.top = rect.top + ((rect.height / 2) - 10) + 'px';
			}

			drawer.appendChild(triangle);

			drawer.style.position = 'fixed';
			drawer.style.zIndex = 1;
			if (this.width != null && this.width.length > 0) drawer.style.width = this.width + 'px';
			if (this.height != null && this.height.length > 0) drawer.style.height = this.height + 'px';
			drawer.style.borderRadius = '1%';
			if (this.dark) drawer.className = 'elevation-15 secondary';
			else drawer.className = 'elevation-15 white';

			drawer.style.visibility = 'visible';

			const tRect = triangle.getBoundingClientRect();
			if (this.top) {
				drawer.style.top = tRect.top + tRect.height + 'px';
				drawer.style.left = tRect.left - 10 + 'px';
			} else {
				drawer.style.top = Math.max(50, rect.top) + 'px';
				drawer.style.left = tRect.left + tRect.width + 'px';
			}

			// Make sure it doesn't go out of screen
			const dRect = drawer.getBoundingClientRect();
			if (dRect.left + dRect.width > window.innerWidth)
				drawer.style.left = dRect.left - (dRect.left + dRect.width - window.innerWidth) - 10 + 'px';


			drawer.removeChild(triangle);
			drawer.appendChild(triangle);
			let opacity = 0;
			const inId = setInterval(() => {
				drawer.style.opacity = opacity;
				triangle.style.opacity = opacity;
				opacity += 0.025;
				if (opacity > 1) {
					triangle.style.opacity = 1;
					clearInterval(inId);
				}
			});

			// Emit open event
			this.$emit('opened');

			// let firstTime = true;
			const callback = () => {
				let opacity = 1;
				const outId = setInterval(() => {
					drawer.style.opacity = opacity;
					triangle.style.opacity = opacity;
					opacity -= 0.025;
					if (opacity <= 0) {
						drawer.style.visibility = 'collapse';
						triangle.parentNode.removeChild(triangle);
						window.removeEventListener('click', onclick);
						clearInterval(outId);
					}
				});
			}

			if (this.releaseKey) {
				Utils.ClickOutsideOrKeyPress(drawer, callback, { key: this.releaseKey });
			} else {
				Utils.ClickOutside(drawer, callback);
			}
		}
	}
}
</script>

<style scoped>

</style>


