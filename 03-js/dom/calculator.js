const form = document.querySelector('form');
const btns = document.querySelectorAll('.btn');
const screen = document.querySelector('#screen');
const del = document.querySelector('#del');

let expression = '0';

resetScreen();

Array.from(btns).forEach((btn) => {
  btn.addEventListener('click', (evt) => {
    const input = btn.getAttribute('data-input');

    if (expression == '0' && input == '0') {
      return;
    } else if (expression == '0' && input != '.') {
      expression = input;
    } else {
      const hasComma = expression.includes('.')
      if (input == '.' && hasComma) {
        throw new Error('oops')
      }
      expression += input;
    }
    updateScreen(expression);
  });
});

form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  updateScreen(eval(expression));
  expression = '';
});

form.addEventListener('reset', (evt) => {
  evt.preventDefault();
  resetScreen();
});

del.addEventListener('click', () => {
  if (expression == '0') return;
  expression = expression.slice(0, expression.length - 1);
  if (expression == '') {
    expression = 0;
  }
  updateScreen(expression);
});

function updateScreen(text) {
  screen.value = text;
}

function resetScreen() {
  expression = '0';
  updateScreen(expression);
}
