export default class ToggleClass {
  constructor(element, childElement) {
    this.element = document.querySelector(element);
    this.child = document.querySelector(childElement);
  }

  show() {
    this.element.classList.add('active');
    this.element.classList.remove('inactive');
  }

  hide() {
    this.element.classList.remove('active');
    this.element.classList.add('inactive');
  }

  showChild() {
    this.child.classList.add('active');
    this.child.classList.remove('inactive');
  }

  hideChild() {
    this.child.classList.remove('active');
    this.child.classList.add('inactive');
  }
}
