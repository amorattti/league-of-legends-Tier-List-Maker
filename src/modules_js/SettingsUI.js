export class SettingsUI {
  constructor(rowElement, settingsElement) {
    this.rows = document.querySelectorAll(rowElement);
    this.settingsElements = document.querySelectorAll(settingsElement);
    this.createElements();
    this.subscribed = [];
  }

  createElements() {
    this.rows.forEach((row, indexRow) => {
      this.attachListener(this.settingsElements, row, indexRow);
    });
  }

  attachListener(settingsElements, row, indexRow) {
    const settingsElement = settingsElements[indexRow];
    settingsElement.addEventListener('click', (event) => {
      this.subscribed.forEach((callback) => callback(row, event, indexRow));
    });
  }

  subscribe(subscribe) {
    this.subscribed.push(subscribe);
  }
}
