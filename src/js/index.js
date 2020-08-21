/* eslint-disable */
import dragula from 'dragula';
import html2canvas from 'html2canvas';
import ToggleClass from './ToggleClass';

const container = document.querySelector('.tier-champions-container');
const buttonSave = document.querySelector('.btn-show');
const buttonClose = document.querySelector('.btn-close');
const screenshotWrapperContainer = document.querySelector(
  '.screenshot-container-wrapper'
);
const screenshotWrapper = document.querySelector('.screenshot-wrapper');

const toggleClass = new ToggleClass(screenshotWrapperContainer);

async function getImages() {
  const fetchApi = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json'
  );
  const fetchJson = await fetchApi.json();

  Object.keys(fetchJson.data).forEach((champion) => {
    const myImage = new Image(80, 80);
    myImage.src = `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${champion}.png`;
    container.appendChild(myImage);
  });
}

async function getCanvas() {
  const canvas = await html2canvas(document.querySelector('.tier-container'), {
    useCORS: true,
    removeContainer: true,
    backgroundColor: null,
  });
  canvas.toDataURL('image/jpeg');
  screenshotWrapper.removeChild(screenshotWrapper.lastChild);
  screenshotWrapper.appendChild(canvas);
  toggleClass.show();
}

getImages();
const download = () => {
  const link = document.createElement('a');
  link.download = 'filename.png';
  link.href = document.querySelector('canvas').toDataURL();
  link.click();
};

document.querySelector('.btn-download').onclick = () => download();

const drake = dragula([].slice.call(document.querySelectorAll('.tier-sort')));
drake.containers.push(container);

buttonSave.onclick = () => getCanvas();
buttonClose.onclick = () => toggleClass.hide();
screenshotWrapperContainer.onclick = (event) => {
  event.stopPropagation();
  toggleClass.hide();
};

screenshotWrapper.onclick = (event) => {
  event.stopPropagation();
};

document.querySelectorAll('.tier-row').forEach((item, index) => {
  document.querySelectorAll('.toUp')[index].onclick = () => {
    if (item.previousElementSibling) {
      item.after(item.previousElementSibling);
    }
  };

  document.querySelectorAll('.toDown')[index].onclick = () => {
    if (item.nextElementSibling) {
      item.before(item.nextElementSibling);
    }
  };
});
