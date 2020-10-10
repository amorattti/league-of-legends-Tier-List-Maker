export class ChangeRowPositionUI {
  constructor(rows, previusElement, nextEmenent) {
    this.rows = document.querySelectorAll(rows);
    this.moveUp = document.querySelectorAll(previusElement);
    this.moveDown = document.querySelectorAll(nextEmenent);
    this.subscribed = [];
    this.attachDomElements();
  }

  attachDomElements() {
    this.rows.forEach((item, index) => {
      this.attachListening(this.moveUp, '.move_up', item, index);
      this.attachListening(this.moveDown, '.move_down', item, index);
    });
  }

  attachListening(btn, selector, item, index) {
    btn[index].addEventListener('click', () => {
      this.subscribed.forEach((callback) => callback(selector, item));
    });
  }

  subscribe(subscribe) {
    this.subscribed.push(subscribe);
  }
}
