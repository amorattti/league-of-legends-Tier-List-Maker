import ToggleClass from './ToggleClass';

export class Settings {
  constructor() {
    this.toggleClass = new ToggleClass('.overlay', '.modalWrapper');
  }

  hideModal() {
    this.toggleClass.hide();
    this.toggleClass.hideChild();
  }

  showModal() {
    this.toggleClass.show();
    this.toggleClass.showChild();
  }

  changeTool(selector) {
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
