import dragula from 'dragula';
import { ChangePositionTools } from './modules_js/Settings_Arrows';
import { ChangeRowPositionUI } from './modules_js/Settings_ArrowsUI';
import { ClickableElementsUI } from './modules_js/ClicableElementsUI';
import { ClickableElements } from './modules_js/ClicableElements';
import { SettingsUI } from './modules_js/SettingsUI';
import { Settings } from './modules_js/Settings';

const tierSortsRow = [...document.querySelectorAll('.tier-sort')];

const changeArrow = new ChangePositionTools();
const clickableElements = new ClickableElements();
const settingsArrowsUI = new ChangeRowPositionUI(
  '.tier-row',
  '.move_up',
  '.move_down',
);

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

buttons.subscribe((selector, event) => {
  clickableElements.changeTool(selector, event);
});

layoutElements.subscribe((selector, event) => {
  clickableElements.changeTool(selector, event);
});

settingsArrowsUI.subscribe((selectorName, item) => {
  changeArrow.changeTool(selectorName, item);
});

settingsUI.subscribe((selector, row) => {
  settingsTools.changeButton(selector, row, tierSortsRow);
});

const drake = dragula(tierSortsRow);
drake.containers.push(document.querySelector('.tier-champions-container'));
