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

async function getImages(value) {
  const fetchApi = await fetch(
    'http://ddragon.leagueoflegends.com/cdn/10.16.1/data/en_US/champion.json'
  );
  const fetchJson = await fetchApi.json();

  container.innerHTML = '';

  function removeDuplicates(arr) {
    var counts = arr.reduce(function (counts, item) {
      counts[item] = (counts[item] || 0) + 1;
      return counts;
    }, {});

    return Object.keys(counts).reduce(function (arr, item) {
      if (counts[item] === 1) {
        arr.push(item);
      }
      return arr;
    }, []);
  }

  const newArr = removeDuplicates(prevDuplicates(fetchJson.data, value));

  newArr.forEach((item) => {
    const myImage = new Image(80, 80);
    myImage.src = `http://ddragon.leagueoflegends.com/cdn/10.16.1/img/champion/${item}.png`;
    myImage.id = item;
    myImage.className = 'icon_champ';
    container.appendChild(myImage);
  });
}

const prevDuplicates = (data, value) => {
  const arr = [];
  Object.values(data).forEach((item) => {
    if (item.tags.includes(value)) {
      return arr.push(item.id);
    } else if (value === 'All') {
      return arr.push(item.id);
    }
  });

  document.querySelectorAll('.tier-sort').forEach((item) => {
    Object.values(item.children).map((item) => arr.push(item.id));
  });

  document.querySelectorAll('.icon_champ').forEach((item) => arr.push(item.id));

  return arr;
};

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

const run = () => {
  getImages('All');
  document.querySelector('select').onchange = (e) => getImages(e.target.value);
};

run();

/*
Link do Api docs

//https://developer.riotgames.com/docs/lol

*/
