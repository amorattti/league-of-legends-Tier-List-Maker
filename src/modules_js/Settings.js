import { SettingsUI } from './SettingsUI';
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import ToggleClass from './ToggleClass';

export class Settings {
  constructor() {
    this.toggleClass = new ToggleClass('.overlay', '.modalWrapper');
    this.colors = document.querySelector('.color-select').children;
    this.color = null;
    this.row = null;
  }

  // eslint-disable-next-line class-methods-use-this
  handleTextare(row) {
    const input = document.querySelector('textarea');
    const rowText = row.children[0].innerText;
    const valueInput = document.getElementById('nameTier');

    input.onchange = (e) => {
      row.children[0].textContent = e.target.value;
    };

    valueInput.value = rowText;
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
    this.row = row;
    this.handleTextare(row);
  }

  removeRow() {
    this.row.remove();
  }

  addRowUp(tierSorts, rowsList) {
    const colors = [];
    const containerRow = document.querySelector('.tier-container');

    const cloneRow = this.row.cloneNode(true);
    cloneRow.children[0].innerText = 'new';
    cloneRow.children[0].style.background = this.randomColor();
    cloneRow.children[1].innerHTML = '';
    containerRow.appendChild(cloneRow);
    tierSorts.push(cloneRow.children[1]);
    rowsList.push(cloneRow);

    // re activate event listeners
    cloneRow.children[2].children[0].onclick = () => {
      this.showModalAndSetListeners(cloneRow);
    };
  }

  // eslint-disable-next-line class-methods-use-this
  addRowDown() {
    console.log('addRowDown');
  }

  // eslint-disable-next-line class-methods-use-this
  randomColor() {
    const colors = ['7FFF7F', '7FFFFF', '7F7FFF', 'FF7FFF', 'BF7FBF'];
    const index = Math.floor(Math.random() * 5);
    return colors[index];
  }

  changeButton(selector, row, tierSorts, rowsList) {
    console.log('row z butotn settings', row);
    switch (selector) {
      case '.modal-close':
        return this.hideModal();
      case '.settings':
        return this.showModalAndSetListeners(row);
      case '#delete-row':
        return this.removeRow();
      case '#add-row-up':
        return this.addRowUp(tierSorts, rowsList);
      case '#add-row-below':
        return this.addRowDown();
      default:
        return '';
    }
  }
}
