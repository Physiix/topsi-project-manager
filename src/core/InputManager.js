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
			} else if (event.key === 'd') {
				if (event.ctrlKey)
					context.$store.commit('ToggleShowHelper');
			} else if (event.key === 'l') {
				if (event.ctrlKey)
					context.$store.commit('ToggleMilestonesList');
			} else if (event.key === 'n') {
				if (event.ctrlKey)
					context.$store.commit('CreateNoteDialog');
			}
		});
	}
}

export const Inputs = new InputManager();