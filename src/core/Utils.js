export class KeyData {
	constructor(key, ctrlPress = false, altPress = false) {
		this.key = key;
		this.ctrlPress = ctrlPress;
		this.altPress = altPress;
	}
}

class Utils {
	/**
	 * Check if a click is done outside an element, and execute a callback if so.
	 * @param {HTMLElement} element Element to check if the click is outside of.
	 * @param {Function} callback Function to call when the click is outside the element.
	 */
	ClickOutside(element, callback) {
		let firstTime = true;
		const onclick = (event) => {
			if (firstTime) {
				firstTime = false;
				return;
			}
			if (!element.contains(event.target)) {
				callback(event);
				window.removeEventListener('click', onclick);
			}
		}
		window.addEventListener('click', onclick);
	}

	/**
	 * Same as @function ClickOutside but also listen to a key press.
	 * @param {HTMLElement} element Element to check if the click is outside of.
	 * @param {Function} callback Function to call when the click is outside the element.
	 * @param {KeyData} keyData Key to listen to.
	 */
	ClickOutsideOrKeyPress(element, callback, keyData) {
		const events = {
			onclick: null,
			keyup: null,
		}

		let firstTime = true;
		events.onclick = (event) => {
			if (firstTime) {
				firstTime = false;
				return;
			}
			if (!element.contains(event.target)) {
				callback(event, 'click');
				window.removeEventListener('click', events.onclick);
				window.removeEventListener('keyup', events.keyup);
			}
		}
		events.keyup = (event) => {
			if (event.key === keyData.key) {
				callback(event, 'keyup');
				window.removeEventListener('click', events.onclick);
				window.removeEventListener('keyup', events.keyup);
			}
		}

		window.addEventListener('click', events.onclick);
		window.addEventListener('keyup', events.keyup);
	}

	/**
	 * Helper function to focus on the textfield.
	 * @param {HTMLElement} textField Textfield to focus on.
	 */
	FocusTextField(textField) {
		setTimeout(() => {
			textField.getElementsByTagName('input')[0].focus()
		}, 100);
	}
}

export default new Utils();