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
    const rowColor = getComputedStyle(row.children[0]).backgroundColor;
    const current = document.getElementsByClassName('selected');

    Object.values(this.colors).forEach((item) => {
      item.onclick = () => {
        row.children[0].style.background = item.style.background;
        current[0].className = current[0].className.replace('selected', '');
        item.className += 'selected';
      };
    });

    current[0].className = current[0].className.replace('selected', '');

    Object.values(this.colors).forEach((item) => {
      if (item.style.background === rowColor) {
        item.className += 'selected';
      }
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
        return this.showModal(row);
      default:
        return '';
    }
  }
}
