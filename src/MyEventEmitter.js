'use strict';

class MyEventEmitter {
  constructor() {
    this.eventsArray = [];
  }

  on(eventName, eventCallback) {
    this.eventsArray.push({ eventName, eventCallback });
  }
  once(eventName, eventCallback) {
    this.eventsArray.push({ eventName, eventCallback, once: true });
  }
  off(eventName, eventCallback) {
    this.eventsArray = this.eventsArray.filter(
      (event) =>
        !(
          event.eventName === eventName && event.eventCallback === eventCallback
        ),
    );
  }

  emit(eventName, ...args) {
    const eventArray = this.eventsArray.filter(
      (item) => item.eventName === eventName,
    );

    eventArray.forEach((filteredElement) => {
      filteredElement.eventCallback(...args);
    });

    this.eventsArray = this.eventsArray.filter(
      (event) => !(event.once && event.eventName === eventName),
    );
  }
  prependListener(eventName, eventCallback) {
    this.eventsArray = [{ eventName, eventCallback }, ...this.eventsArray];
  }
  prependOnceListener(eventName, eventCallback) {
    this.eventsArray = [
      { eventName, eventCallback, once: true },
      ...this.eventsArray,
    ];
  }
  removeAllListeners(eventName) {
    if (eventName) {
      this.eventsArray = this.eventsArray.filter(
        (event) => event.eventName !== eventName,
      );
    } else {
      this.eventsArray = [];
    }
  }
  listenerCount(eventName) {
    return this.eventsArray.filter((event) => event.eventName === eventName)
      .length;
  }
}

module.exports = MyEventEmitter;
