let bubbleContainer = document.getElementById('bubble-container');
let bubbleForm = document.getElementById('bubble-form');

// panggil callback function onSubmit
// ketika pengguna menekan tombol submit pada form
bubbleForm.addEventListener('submit', function onSubmit(event) {
  event.preventDefault();

  // ambil value dari input bernama countinp, nilainya berupa string
  let count = event.target.countinp.value;
  // konversi string ke number
  count = parseInt(count, 10);

  // ambil value dari input bernama color
  const color = event.target.colorinp.value;

  // Array yang element-elementnya adalah bubble dom element
  const bubbles = createNBubbles(count, color);

  for (let i = 0; i < bubbles.length; i++) {
    let theBubble = bubbles[i];

    // append dom element, sehinnga menjadi child node dari bubbleContainer
    bubbleContainer.appendChild(theBubble);
  }

  updateBubbleCounter();

  // useNextColor();
});

/**
 * Membuat bubble dom element.
 *
 * @param  {string} color hexa color, contoh: #fff
 * @return {HTMLDivElement}
 */
function createBubble(color) {
  let div = document.createElement('div');

  // set attribute class
  div.setAttribute('class', 'bubble-style');
  // set attribute style, gunakan parameter color sbg background
  div.setAttribute('style', 'background-color:' +  color);

  const handleDeleteOnClick = function () {
    // parent == bubbleContainer
    const parent = div.parentNode;

    // clean up event listener sebelum menghapus element
    div.removeEventListener('click', handleDeleteOnClick);

    // hapus element dari parent nya
    parent.removeChild(div);
    updateBubbleCounter();
  };

  div.addEventListener('click', handleDeleteOnClick);

  return div;
}

/**
 * Membuat bubble (dom element) sebanyak N.
 *
 * @param  {number} n jumlah bubble element yg ingin dibuat
 * @param  {string} color hexa color, contoh: #fff
 * @return {Array<HTMLDivElement>}
 */
function createNBubbles(n, color) {
  let bubbles = [];

  for (let i = 0; i < n; i++) {
    let bubble = createBubble(color);
    bubbles.push(bubble);
  }

  return bubbles;
}

/**
 * Update counter di judul halaman
 */
function updateBubbleCounter() {
  // seleksi element yang akan diupdate teks-nya
  let counter = document.getElementById('counter-el');

  // seleksi semua element bubble
  let bubbles = document.querySelectorAll('.bubble-style');

  // ambil jumlah nya
  let count = bubbles.length;

  // update text dari element counter
  counter.innerText = count;
}

function useNextColor() {
  const select = bubbleForm.querySelector('select');
  const optionCount = select.children.length;
  const maxIndex = optionCount - 1;
  const selectedIndex = select.selectedIndex;

  let nextIndex = selectedIndex === maxIndex
    ? 0
    : selectedIndex + 1;

  select.selectedIndex = nextIndex;
}
