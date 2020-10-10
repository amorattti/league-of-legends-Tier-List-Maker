import ToggleClass from './ToggleClass';

export class SettingsUI {
  constructor(rows, selectorName) {
    this.toggleClass = new ToggleClass('.overlay', '.modalWrapper');
    this.rows = document.querySelectorAll(rows);
    this.settingsModal = document.querySelector('.modalWrapper');
    this.settingsElements = selectorName;
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
      this.createSettingButton('.tier-rank', row, indexRow);
    });

    this.createSettingButton('.modal-close', null, 0);
    this.createSettingButton('#delete-row', null, 0);
    this.createSettingButton('#add-row-up', null, 0);
    this.createSettingButton('#add-row-below', null, 0);
  }

  createSettingButton(element, row, indexRow) {
    const elementButton = document.querySelectorAll(element)[indexRow];
    elementButton.addEventListener('click', () => {
      this.subscribed.forEach((callback) => {
        callback(element, row);
      });
    });
  }

  subscribe(subscribe) {
    this.subscribed.push(subscribe);
  }
}
