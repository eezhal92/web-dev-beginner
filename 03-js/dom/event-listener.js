const btn1 = document.getElementById('btn-1');

btn1.addEventListener('click', () => {
  alert('button di click!');
});

const myForm = document.getElementById('my-form');

myForm.addEventListener('submit', (event) => {
  const theForm = event.target;
  console.log(theForm == myForm);

  const message = theForm.message.value;

  if (!message) {
    alert('Pesan anda kosong!');
    return;
  }
  alert('Pesan anda adalah: ' + message);
});
