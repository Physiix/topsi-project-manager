class Utilities {
	/**
	 * Check if a click is done outside an element, and execute a callback if so.
	 * @param {HTMLElement} element Element to check if the click is outside of.
	 * @param {Function} callback Function to call when the click is outside the element.
	 */
	ClickOutside(element, callback) {
		const onclick = (event) => {
			if (!element.contains(event.target)) {
				callback(event);
				window.removeEventListener('click', onclick);
			}
		}
		window.addEventListener('click', onclick);
	}
}

export const Utils = new Utilities();