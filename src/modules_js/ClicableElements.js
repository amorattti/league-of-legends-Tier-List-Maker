/* eslint-disable class-methods-use-this */
import { DrawingCanvasUI } from './DrawingCanvas2Html';
import { fetchImages } from './fetch.images';
import { ImagesUI } from './ImagesUI';
import ToggleClass from './ToggleClass';

const URL = 'http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json';

export class ClickableElements {
  constructor() {
    this.canvasToHtmlClass = new DrawingCanvasUI(
      '.tier-container',
      '.screenshot-wrapper',
      '.screenshot-container-wrapper',
    );
    this.toggleClass = new ToggleClass('.screenshot-container-wrapper');
    this.setCategory(null);
  }

  drawCanvasToHtml() {
    this.canvasToHtmlClass.drawCanvas();
  }

  hideWrapper() {
    this.toggleClass.hide();
  }

  hideWrapperContainer(event) {
    event.stopPropagation();
    this.toggleClass.hide();
  }

  screenshotWrapper(event) {
    event.stopPropagation();
  }

  download() {
    const link = document.createElement('a');
    link.download = 'filename.png';
    link.href = document.querySelector('canvas').toDataURL();
    link.click();
  }

  async setCategory(event) {
    let categoryName;
    if (event) {
      const { value } = event.target;
      categoryName = value;
    } else {
      categoryName = 'All';
    }
    document.querySelector('.tier-champions-container').innerHTML = '';
    const fetchedData = await fetchImages(URL);
    const getImages = new ImagesUI('.tier-champions-container', fetchedData);
    getImages.createImagesByCategory(categoryName);
  }

  changeButton(selector, event) {
    switch (selector) {
      case '.btn-show':
        return this.drawCanvasToHtml();
      case '.btn-close':
        return this.hideWrapper();
      case '.btn-download':
        return this.download();
      case '.screenshot-container-wrapper':
        return this.hideWrapperContainer(event);
      case '.screenshot-wrapper':
        return this.screenshotWrapper(event);
      case '#category':
        return this.setCategory(event);
      default:
        return '';
    }
  }
}
