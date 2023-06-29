const eventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => {
      callback(e.detail);
    });
  },
  dispatch(event, data) {
    const customEvent = new CustomEvent(event, { detail: data });
    document.dispatchEvent(customEvent);
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;
