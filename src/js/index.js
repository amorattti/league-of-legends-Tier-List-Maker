import dragula from 'dragula';
import html2canvas from 'html2canvas';

import ToggleClass from './ToggleClass';

const container = document.querySelector('.tier-champions-container');
const buttonSave = document.querySelector('.btn-show');
const buttonClose = document.querySelector('.btn-close');
const ScreenshotWrapperContainer = document.querySelector('.screenshot-container-wrapper');
const ScreenshotWrapper = document.querySelector('.screenshot-wrapper');

const toggleClass = new ToggleClass(ScreenshotWrapperContainer)

async function getImages() {
  const fetchApi = await fetch('http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json');
  const fetchJson = await fetchApi.json();
  Object.keys(fetchJson.data).map(champion => {
    const myImage = new Image(80, 80);
    myImage.src = `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion}.png`;
    container.appendChild(myImage);
  });
}

async function getCanvas() {
  const canvas = await html2canvas(document.querySelector(".tier-container"), {
    useCORS: true,
    removeContainer: true,
    backgroundColor: null,
  });

  ScreenshotWrapper.removeChild(ScreenshotWrapper.lastChild);
  ScreenshotWrapper.appendChild(canvas);
  toggleClass.show();

}
getImages();


const drake = dragula([].slice.call(document.querySelectorAll(".tier-sort")));
drake.containers.push(container);


buttonSave.onclick = () => getCanvas();
buttonClose.onclick = () => toggleClass.hide();