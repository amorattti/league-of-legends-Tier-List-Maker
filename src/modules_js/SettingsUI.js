import ToggleClass from './ToggleClass';

export class SettingsUI {
  constructor(rows, settingsElement) {
    this.toggleClass = new ToggleClass('.overlay', '.modalWrapper');
    this.rows = document.querySelectorAll(rows);
    this.settingsModal = document.querySelector('.modalWrapper');
    this.settingsElements = settingsElement;
    this.createSettingsButtons();
    this.stopPropagation();
    this.subscribed = [];
  }

  stopPropagation() {
    if (this.settingsModal) {
      this.settingsModal.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }
  }

  createSettingsButtons() {
    this.rows.forEach((row, indexRow) => {
      this.createSettingButton(this.settingsElements, row, indexRow);
    });
    this.createSettingButton('.modal-close', null, 0);
  }

  createSettingButton(element, row, indexRow) {
    const elementButton = document.querySelectorAll(element)[indexRow];
    elementButton.addEventListener('click', () => {
      this.subscribed.forEach((callback) => callback(element));
    });
  }

  subscribe(subscribe) {
    this.subscribed.push(subscribe);
  }
}
