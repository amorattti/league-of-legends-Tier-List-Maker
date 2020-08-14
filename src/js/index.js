import dragula from 'dragula';
import html2canvas from 'html2canvas';

const container = document.querySelector('.tier-champions-container');
const button = document.querySelector('button');

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
    backgroundColor: null,
  });
  document.querySelector('.screenshot-wrapper').style.display = 'flex';
  document.querySelector('.screenshot-wrapper').appendChild(canvas);
  console.log('hid')
}
getImages();


const drake = dragula([].slice.call(document.querySelectorAll(".tier-sort")));
drake.containers.push(container);

button.addEventListener('click', () => getCanvas());
console.log(document.querySelector('article'))
document.querySelector('article').onClick = () => console.log('lalalalaalal')