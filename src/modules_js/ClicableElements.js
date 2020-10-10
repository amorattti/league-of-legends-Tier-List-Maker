
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
    );
    this.toggleClass = new ToggleClass('.overlay', '.screenshot-wrapper');
    this.setCategory(null);
  }

  drawCanvasToHtml() {
    this.toggleClass.show();
    this.toggleClass.showChild();
    this.canvasToHtmlClass.drawCanvas();
  }

  hideWrapper() {
    this.toggleClass.hide();
    this.toggleClass.hideChild();
  }

  hideScreenshotWrapperContainer() {
    this.toggleClass.hide();
    this.toggleClass.hideChild();
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

  changeTool(selector, event) {
    switch (selector) {
      case '.btn-show':
        return this.drawCanvasToHtml();
      case '.btn-close':
        return this.hideWrapper();
      case '.btn-download':
        return this.download();
      case '.overlay':
        return this.hideScreenshotWrapperContainer();
      case '.screenshot-wrapper':
        return this.screenshotWrapper(event);
      case '#category':
        return this.setCategory(event);

      default:
        return '';
    }
  }
}
