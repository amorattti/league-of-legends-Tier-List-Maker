import { ChangePositionTools } from './modules_js/Arrows';
import { ChangeRowPositionUI } from './modules_js/ArrowsUI';
import { ClickableElementsUI } from './modules_js/ClicableElementsUI';
import { ClickableElements } from './modules_js/ClicableElements';
import { Dnd } from './modules_js/DragAndDrop';

const dragAndDrop = new Dnd('.tier-champions-container', '.tier-sort');
const changeArrow = new ChangePositionTools();
const arrowUI = new ChangeRowPositionUI('.tier-row', '.move_up', '.move_down');
const clickableElementsUI = new ClickableElementsUI([
  ['.btn-show', 'click'],
  ['.btn-close', 'click'],
  ['.btn-download', 'click'],
  ['.screenshot-container-wrapper', 'click'],
  ['.screenshot-wrapper', 'click'],
  ['#category', 'change'],
]);
const clickableElements = new ClickableElements();

dragAndDrop.dnd();

// it refers to the up arrows and down arrow
arrowUI.subscribe((selectorName, item) => {
  changeArrow.changeTool(selectorName, item);
});

clickableElementsUI.subscribe((selector, event) => {
  clickableElements.changeButton(selector, event);
});
