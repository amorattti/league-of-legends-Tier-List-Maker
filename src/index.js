import { ChangePositionTools } from './modules_js/Arrows';
import { ChangeRowPositionUI } from './modules_js/ArrowsUI';
import { ClickableElementsUI } from './modules_js/ClicableElementsUI';
import { ClickableElements } from './modules_js/ClicableElements';
import { Dnd } from './modules_js/DragAndDrop';
import { SettingsUI } from './modules_js/SettingsUI';
import { Settings } from './modules_js/Settings';

const dragAndDrop = new Dnd('.tier-champions-container', '.tier-sort');
const changeArrow = new ChangePositionTools();
const clickableElements = new ClickableElements();
const arrowsUI = new ChangeRowPositionUI('.tier-row', '.move_up', '.move_down');
const buttons = new ClickableElementsUI([
  ['.btn-show', 'click'],
  ['.btn-close', 'click'],
  ['.btn-download', 'click'],
  ['#category', 'change'],
  ['.settings', 'click'],
]);
const layoutElements = new ClickableElementsUI([
  ['.overlay', 'click'],
  ['.screenshot-wrapper', 'click'],
]);
const settingsUI = new SettingsUI('.tier-row', '.settings');
const settingsTools = new Settings();

dragAndDrop.dnd();

arrowsUI.subscribe((selectorName, item) => {
  changeArrow.changeTool(selectorName, item);
});

buttons.subscribe((selector, event) => {
  clickableElements.changeTool(selector, event);
});

layoutElements.subscribe((selector, event) => {
  clickableElements.changeTool(selector, event);
});

settingsUI.subscribe((selector, indexRow, row) => {
  settingsTools.changeButton(selector, row);
});
