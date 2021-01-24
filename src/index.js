import { ChangePositionTools } from './modules_js/Settings_Arrows';
import { ChangeRowPositionUI } from './modules_js/Settings_ArrowsUI';
import { ClickableElementsUI } from './modules_js/ClicableElementsUI';
import { ClickableElements } from './modules_js/ClicableElements';
import { SettingsUI } from './modules_js/SettingsUI';
import { Settings } from './modules_js/Settings';
import { fetchImages as fetchVersion } from './modules_js/fetch.images';

(async () => {
  let version = '10.23.1';
  await fetchVersion(
    'https://ddragon.leagueoflegends.com/api/versions.json',
    // eslint-disable-next-line no-return-assign
  ).then((data) => {
    const [currentVersion] = data;
    version = currentVersion;
  });

  const tierSortsRow = [...document.querySelectorAll('.tier-sort')];

  const changeArrow = new ChangePositionTools();
  const clickableElements = new ClickableElements(version);
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
    clickableElements.changeTool(selector, event, version);
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
})();
