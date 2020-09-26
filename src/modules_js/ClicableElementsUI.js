export class ClickableElementsUI {
  constructor(arrayOfButtons) {
    this.buttons = arrayOfButtons;
    this.subscribed = [];
    this.createElements();
  }

  createElements() {
    this.buttons.forEach(([selector, eventType]) => {
      this.createElement(selector, eventType);
    });
  }

  createElement(selector, eventType) {
    const button = document.querySelector(selector);
    button.addEventListener(eventType, (event) => {
      this.subscribed.forEach((callback) => callback(selector, event));
    });
  }

  subscribe(subscribe) {
    this.subscribed.push(subscribe);
  }
}
