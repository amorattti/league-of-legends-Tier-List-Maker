/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import ToggleClass from './ToggleClass';

export class Settings {
  constructor() {
    this.toggleClass = new ToggleClass('.overlay', '.modalWrapper');
    this.colors = document.querySelector('.color-select').children;
    this.color = null;
  }

  // eslint-disable-next-line class-methods-use-this
  handleTextare(row) {
    const input = document.querySelector('textarea');
    const rowText = row.children[0].innerText;
    const valueInput = document.getElementById('nameTier');

    valueInput.value = rowText;

    input.addEventListener('input', (e) => {
      row.children[0].textContent = e.target.value;
    });
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

  showModalAndSetListeners(row) {
    this.toggleClass.show();
    this.toggleClass.showChild();
    this.setColors(row);
    this.handleTextare(row);
  }

  changeButton(selector, row) {
    switch (selector) {
      case '.modal-close':
        return this.hideModal();
      case '.settings':
        return this.showModalAndSetListeners(row);
      default:
        return '';
    }
  }
}
