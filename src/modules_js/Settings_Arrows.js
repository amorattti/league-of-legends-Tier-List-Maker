/* eslint-disable */
export class ChangePositionTools {
  moveUp(item) {
    if (item.previousElementSibling) {
      item.after(item.previousElementSibling);
		}
  }

  moveDown(item) {
    if (item.nextElementSibling) {
      item.before(item.nextElementSibling);
		}
  }

  changeTool(selectorName, item) {
    switch (selectorName) {
      case '.move_up':
        return this.moveUp(item);
      case '.move_down':
        return this.moveDown(item);
      default:
        return;
    }
  }
}
