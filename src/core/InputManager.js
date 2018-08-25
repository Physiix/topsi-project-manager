class InputManager {
	/**
	 * Setup all the input to listen to and their callbacks.
	 * @param {Vue} context Vue context.
	 */
	Initialize(context) {
		window.addEventListener('keypress', (event) => {
			if (event.code === 'KeyF') {
				if (event.ctrlKey)
					context.$store.commit('ToggleSearch');
			} else if (event.code === 'KeyD') {
				if (event.ctrlKey)
					context.$store.commit('ToggleShowHelper');
			} else if (event.code === 'KeyL') {
				if (event.ctrlKey)
					context.$store.commit('ToggleMilestonesList');
			} else if (event.code === 'KeyN') {
				if (event.ctrlKey)
					context.$store.commit('CreateNoteDialog');
			}
		});
	}
}

export const Inputs = new InputManager();