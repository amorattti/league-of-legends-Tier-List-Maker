import ToggleClass from './ToggleClass';

export class Settings {
  constructor(row, eventt, indexRow) {
    this.row = row;
    this.toggleClass = new ToggleClass('.overlay', '.modalWrapper');
    this.modalWrapperElement = document.querySelectorAll('.modalWrapper')[
      indexRow
    ];
    this.show();
    this.stopPropagation(eventt);
  }

  show() {
    this.toggleClass.show();
		this.toggleClass.showChild();
		console.log(this.row, 'row')
  }

  stopPropagation() {
    if (this.modalWrapperElement) {
      this.modalWrapperElement.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  changeTool(selector) {
    switch (selector) {
      case '.settings':
        return this.changeView();
      default:
        return '';
    }
  }
}
