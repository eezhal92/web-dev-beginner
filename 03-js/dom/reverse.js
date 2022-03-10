/**
 * Membalik karakter string
 * @param {string} str
 */
function reverse(str) {
  return str.split('').reverse().join('');
}

const $btn = document.getElementById('btn');
const $name = document.getElementById('name');

$btn.addEventListener('click', () => {
  const reversed = reverse($name.value);
  $name.value = reversed;
});
