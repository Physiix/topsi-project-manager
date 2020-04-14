class EventManager {
  Subscribe(event: any, callback: () => {}) {
    document.querySelector("body")!.addEventListener(event, callback);
  }

  Emit(event: any) {
    document.querySelector("body")!.dispatchEvent(new Event(event));
  }
}

export default new EventManager();
