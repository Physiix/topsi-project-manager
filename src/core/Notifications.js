const DEFAULT_TIME = 5000;
export class NotificationEntry {
	constructor(title, description, timeout, color) {
		this.title = title;
		this.description = description;
		this.timeout = timeout;
		this.color = color;
	}
}
class Notifications {
	constructor() {
		// Contains the notifications to display.
		this.queue = [];

		// Whether it's ready do display.
		this.ready = true;

		// Loop and display the notifications in the queues
		const queuId = setInterval(() => {
			if (this.ready && this.queue.length > 0) {
				this.ready = false;
				this.Notify(this.queue.pop());
			}
		}, 150);
	}

	/**
	 * 	Display an info notification in the screen.
	 * @param {String} title Title of the notification to display.
	 * @param {String} description Description of the notification to display.
	 * @param {Number} timout Time before destroying the notification.
	 */
	Info(title, description = '', timeout = DEFAULT_TIME) {
		this.queue.push(new NotificationEntry(title, description, timeout, 'primary white--text'));
	}

	/**
	 * 	Display an error notification in the screen.
	 * @param {String} title Title of the notification to display.
	 * @param {String} description Description of the notification to display.
	 * @param {Number} timout Time before destroying the notification.
	 */
	Error(title, description = '', timeout = DEFAULT_TIME) {
		this.queue.push(new NotificationEntry(title, description, timeout, 'error white--text'));
		throw new Error(`${title} ${description}`);
	}


	/**
	 * 	Display an error notification in the screen.
	 * @param {String} title Title of the notification to display.
	 * @param {String} description Description of the notification to display.
	 * @param {Number} timout Time before destroying the notification.
	 */
	Warning(title, description = '', timeout = DEFAULT_TIME) {
		this.queue.push(new NotificationEntry(title, description, timeout, 'warning white--text'));
	}


	/**
	 * 	Display an error notification in the screen.
	 * @param {String} title Title of the notification to display.
	 * @param {String} description Description of the notification to display.
	 * @param {Number} timout Time before destroying the notification.
	 */
	Success(title, description = '', timeout = DEFAULT_TIME) {
		this.queue.push(new NotificationEntry(title, description, timeout, 'success white--text'));
	}


	/**
	 * Setup the notification system. 
	 * @param {NotificationEntry} entry Contains the info about the notification.
	 */
	Notify(entry) {
		const nElement = document.createElement('div');
		document.querySelector('body').appendChild(nElement);

		// Basic customization 
		const color = entry.color;
		const left = window.innerWidth - 260;
		nElement.className = color + ' notification-card';
		nElement.style.position = 'fixed';
		nElement.style.width = '250px';
		nElement.style.left = left + 'px';

		// Populating the notification its info.
		const eTitle = document.createElement('div');
		eTitle.className = 'v-card__title title pa-2';
		eTitle.innerHTML = entry.title;
		const eDesc = document.createElement('div');
		eDesc.className = 'v-card__text subheading px-2';
		eDesc.innerHTML = (entry.description) ? entry.description : '';
		nElement.appendChild(eTitle);
		nElement.appendChild(eDesc);

		// Calculating the dimnesions
		const height = nElement.clientHeight;
		const totalHeight = height + 10;

		// When a new notification is added, make sure to move all the other.
		const nots = document.getElementsByClassName('notification-card');
		for (let i = 0; i < nots.length; i++) {
			const item = nots.item(i);
			const rect = item.getBoundingClientRect();

			let moveTop = 0;
			const moveId = setInterval(() => {
				moveTop += 6;
				item.style.top = rect.top - moveTop + 'px';
				if (moveTop >= totalHeight) {
					item.style.top = rect.top - totalHeight + 'px';
					clearInterval(moveId);
				}
			})
		}

		// Entering animation.
		let enterTop = 0;
		const enterId = setInterval(() => {
			enterTop += 6;
			nElement.style.top = window.innerHeight - enterTop + 'px';
			if (enterTop >= totalHeight) {
				nElement.style.top = window.innerHeight - totalHeight + 'px';
				this.ready = true;
				clearInterval(enterId);
			}
		})
		nElement.style.top = window.innerHeight - totalHeight + 'px';

		// Exiting animation.
		setTimeout(() => {
			let outLeft = left;
			const outId = setInterval(() => {
				outLeft += 6;
				nElement.style.left = outLeft + 'px';
				if (outLeft > window.innerWidth) {
					document.querySelector('body').removeChild(nElement);
					clearInterval(outId);
				}
			})

		}, entry.timeout ? entry.timeout : DEFAULT_TIME);
	}
}


export default new Notifications();