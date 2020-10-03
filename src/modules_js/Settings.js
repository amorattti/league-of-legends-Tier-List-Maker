/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import ToggleClass from './ToggleClass';

export class Settings {
  constructor() {
    this.toggleClass = new ToggleClass('.overlay', '.modalWrapper');
    this.colors = document.querySelector('.color-select').children;
    this.color = null;
  }

  setColors(row) {
    Object.values(this.colors).forEach((item) => {
      item.onclick = () =>
        (row.children[0].style.background = item.style.background);
    });
  }

  hideModal() {
    this.toggleClass.hide();
    this.toggleClass.hideChild();
  }

  showModal() {
    this.toggleClass.show();
    this.toggleClass.showChild();
  }

  changeButton(selector, row) {
    this.setColors(row);
    switch (selector) {
      case '.modal-close':
        return this.hideModal();
      case '.settings':
        return this.showModal();
      default:
        return '';
    }
  }
}
