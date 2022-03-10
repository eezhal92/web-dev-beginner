const body = document.body;
const title = document.querySelector('h1');

const divElement = document.createElement('div');
divElement.setAttribute('style', 'color: red');
divElement.innerText = 'Ini div dibuat dari js juga. tulisan warna merah';

body.appendChild(divElement);

const pElement = document.createElement('p');
pElement.innerText = 'Halo, element ini dibuat dari script js';

body.insertBefore(pElement, title.nextSibling);
