import { ChangePositionTools } from './Settings_Arrows';
import ToggleClass from './ToggleClass';
/* eslint-disable */
export class Settings {
  constructor() {
    this.toggleClass = new ToggleClass('.overlay', '.modalWrapper');
    this.changePositionTools = new ChangePositionTools();
    this.colors = document.querySelector('.color-select').children;
    this.rowsContainer = document.querySelector('.tier-container');
    this.color = null;
    this.row = null;
  }

  handleTextare(row) {
    const inputSettings = document.querySelector('textarea');
    const rowInputText = row.children[0].children[0];

    inputSettings.onchange = (e) => {
      rowInputText.value = e.target.value;
    };

    inputSettings.value = rowInputText.value;
  }

  setColors(row) {
		const rowColor = getComputedStyle(row.children[0].firstElementChild).backgroundColor;
    const current = document.getElementsByClassName('selected');

    Object.values(this.colors).forEach((item) => {
      item.onclick = () => {
        row.children[0].children[0].style.background = item.style.background;
        current[0].className = current[0].className.replace('selected', '');
        item.className += 'selected';
      };
    });

		current[0].className = current[0].className.replace('selected', '');

    Object.values(this.colors).forEach((item) => {
      console.log(item.style.background);
      if (item.style.background === rowColor) {
        item.className = 'selected';
      }
    });
  }

  hideModal() {
    this.toggleClass.hide();
    this.toggleClass.hideChild();
  }

  removeRow() {
    this.row.remove();
  }

  createNewRow(tierSortsRow, callback) {
    const cloneRow = this.row.cloneNode(true);

    cloneRow.children[0].children[0].value = 'new';
    cloneRow.children[1].innerHTML = '';
    cloneRow.children[0].style.background = `#${this.randomColor()}`;

    // re activate event listeners
    cloneRow.children[2].children[0].onclick = () => {
      this.showModalAndSetListeners(cloneRow);
    };
    cloneRow.children[2].children[1].children[0].onclick = () => {
      this.changePositionTools.moveUp(cloneRow);
    };
    cloneRow.children[2].children[1].children[1].onclick = () => {
      this.changePositionTools.moveDown(cloneRow);
    };

    tierSortsRow.push(cloneRow.children[1]);
    callback(cloneRow);
  }

  addRowDown(tierSortsRow) {
    this.createNewRow(tierSortsRow, (cloneRow) => {
      this.insertAfter(cloneRow, this.row);
    });
  }

  addRowUp(tierSortsRow) {
    this.createNewRow(tierSortsRow, (cloneRow) => {
      this.rowsContainer.insertBefore(cloneRow, this.row);
    });
  }

  insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  randomColor() {
    const colors = [
      '7FFF7F',
      '7FFFFF',
      '7F7FFF',
      'FF7FFF',
      'BF7FBF',
      '3B3B3B',
      '858585',
      'CFCFCF',
      'F7F7F7',
    ];
    const index = Math.floor(Math.random() * 5);
    return colors[index];
  }

  showModalAndSetListeners(row) {
    this.toggleClass.show();
    this.toggleClass.showChild();
    this.setColors(row);
    this.row = row;
    this.handleTextare(row);
  }

  changeButton(selector, row, tierSortsRow) {
    switch (selector) {
      case '.modal-close':
        return this.hideModal();
      case '.settings':
        return this.showModalAndSetListeners(row);
      case '#delete-row':
        return this.removeRow();
      case '#add-row-up':
        return this.addRowUp(tierSortsRow);
      case '#add-row-below':
        return this.addRowDown(tierSortsRow);
      default:
        return '';
    }
  }
}
