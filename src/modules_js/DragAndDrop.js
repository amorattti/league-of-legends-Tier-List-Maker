import dragula from 'dragula';

export class Dnd {
  constructor(mainContainer, rowContainers) {
    this.mainContainer = document.querySelector(mainContainer);
    this.rowContainers = document.querySelectorAll(rowContainers);
  }

  dnd() {
    const drake = dragula([].slice.call(this.rowContainers));
    drake.containers.push(this.mainContainer);
  }
}
