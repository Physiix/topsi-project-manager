import Vue from "vue";
import store from '../renderer/store'

const COMPACT_DRAWER_WIDTH = 50;
class ApplicationManager {
	constructor() {
		this.mainContainerId = null;
		this.vue = new Vue({
			store
		});
	}

	SetupLandingPage(containerId, sideId, contentId) {
		const container = document.getElementById(containerId);
		const side = document.getElementById(sideId);
		const content = document.getElementById(contentId);

		const resize = () => {
			container.style.width = window.innerWidth + 'px';
			container.style.height = window.innerHeight + 'px';
		}
		resize();
		window.addEventListener('resize', resize);

		container.style.display = 'grid';
		container.style.gridTemplateColumns = this.vue.$store.getters.drawerWidth + 'px repeat(5, 1fr)';
		container.style.gridTemplateRows = '30px repeat(5, 1fr)';

		side.style.gridColumn = '1 / 2';
		side.style.gridRow = '2 / 7';

		content.style.gridColumn = '2 / 7';
		content.style.gridRow = '2 / 7';

		this.mainContainerId = containerId;
	}

	SetupNotesPage(categoryContainerId, containerId, ...categories) {
		const container = document.getElementById(categoryContainerId);

		const resize = () => {
			const offset = 5;
			container.style.width = window.innerWidth - COMPACT_DRAWER_WIDTH + offset + 'px';
			container.style.height = (window.innerHeight - 30) + 'px';
		}

		let value = this.vue.$store.getters.drawerWidth;
		const id = setInterval(() => {
			value -= 8;
			document.getElementById(containerId).style.gridTemplateColumns = value + 'px repeat(5, 1fr)';
			if (value <= COMPACT_DRAWER_WIDTH) clearInterval(id);
		})

		resize();
		window.addEventListener('resize', resize);

		container.style.display = 'grid';
		container.style.gridTemplateColumns = `repeat(${categories.length}, 1fr) 5px`
		container.style.gridTemplateRows = '1fr';

		let index = 1;
		categories.forEach(category => {
			const parcel = document.getElementById(category + '-container');
			parcel.style.gridColumn = `${index}/${index + 1}`;
			index++;
		})
	}

	SetupProjectsPage(containerId) {
		let value = COMPACT_DRAWER_WIDTH;
		const width = this.vue.$store.getters.drawerWidth;
		const id = setInterval(() => {
			value += 8;
			document.getElementById(containerId).style.gridTemplateColumns = value + 'px repeat(5, 1fr)';
			if (value >= width) clearInterval(id);
		})
	}
}

export const AppManager = new ApplicationManager();