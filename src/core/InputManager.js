class InputManager {
	/**
	 * Setup all the input to listen to and their callbacks.
	 * @param {Vue} context Vue context.
	 */
	Initialize(context) {
		window.addEventListener('keypress', (event) => {
			if (event.key === 'f') {
				if (event.ctrlKey)
					context.$store.commit('ToggleSearch');
			}
		})
	}
}

export const Inputs = new InputManager();