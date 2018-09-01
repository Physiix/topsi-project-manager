class EventManager {
	Subscribe(event, callback) {
		document.querySelector('body').addEventListener(event, callback);
	}

	Emit(event) {
		document.querySelector('body').dispatchEvent(new Event(event));
	}
}

export default new EventManager();