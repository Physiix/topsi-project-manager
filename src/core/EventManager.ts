class EventManager {
  subscribe(event: any, callback: () => {}) {
    document.querySelector("body")!.addEventListener(event, callback);
  }

  emit(event: any) {
    document.querySelector("body")!.dispatchEvent(new Event(event));
  }
}

export default new EventManager();
