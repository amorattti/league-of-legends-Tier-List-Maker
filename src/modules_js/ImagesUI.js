/* eslint-disable */
import { GroupByCategory } from './GroupByCategory';

export class ImagesUI {
  constructor(container, fetchedData, version) {
    this.filterByCategory = new GroupByCategory(fetchedData);
    this.version = version;
    this.container = container;
    this.width = 80;
    this.height = 80;
  }

  attachToContainer(container, root) {
    document.querySelector(container).appendChild(root);
  }

  createImagesByCategory(categoryName = 'Tank') {
    this.filterByCategory.setUpByCategory(categoryName).forEach((item) => {
      const myImage = new Image(this.width, this.height);
      myImage.src = `http://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${item}.png`;
      myImage.id = item;
      myImage.className = 'icon_champ';
      this.attachToContainer(this.container, myImage);
    });
  }
}
