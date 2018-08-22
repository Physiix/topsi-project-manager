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

	SetupNotesPage(categoryContainerId, containerId, categories, foldedCategories = [], foldDrawer = true) {
		const container = document.getElementById(categoryContainerId);

		const resize = () => {
			const offset = 5;
			container.style.width = window.innerWidth - COMPACT_DRAWER_WIDTH + offset + 'px';
			container.style.height = (window.innerHeight - 30) + 'px';

			foldedCategories.forEach(category => {
				document.getElementById(category + '-container').childNodes[0].style.height = (window.innerHeight - 30) + 'px';
			})
		}

		if (foldDrawer) {
			let value = this.vue.$store.getters.drawerWidth;
			const id = setInterval(() => {
				value -= 8;
				document.getElementById(containerId).style.gridTemplateColumns = value + 'px repeat(5, 1fr)';
				if (value <= COMPACT_DRAWER_WIDTH) clearInterval(id);
			})
		}

		resize();
		window.addEventListener('resize', resize);

		container.style.display = 'grid';
		let unfoldedColumns = `repeat(${categories.length}, 1fr)`;
		if (categories.length <= 0) unfoldedColumns = '1fr';

		let foldedColumns = `repeat(${foldedCategories.length}, 50px)`
		if (foldedCategories.length <= 0) foldedColumns = '';
		container.style.gridTemplateColumns = `${unfoldedColumns} ${foldedColumns}`
		container.style.gridTemplateRows = '1fr';

		let index = 1;
		categories.forEach(category => {
			const parcel = document.getElementById(category + '-container');
			parcel.removeAttribute('style');
			parcel.style.gridColumn = `${index}/${index + 1}`;
			parcel.style.gridRow = `1 / 2`;
			index++;
		});

		foldedCategories.forEach(category => {
			const parcel = document.getElementById(category + '-container');
			parcel.removeAttribute('style');
			parcel.style.gridColumn = `${index}/${index + 1}`;
			parcel.style.gridRow = `1 / 2`;
			parcel.style.writingMode = 'vertical-rl';
			parcel.style.textAlign = 'center';
			parcel.style.overflow = 'unset';
			index++;
		});
		window.addEventListener('resize', resize);
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