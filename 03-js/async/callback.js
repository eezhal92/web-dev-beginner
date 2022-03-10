/**
 * Mendapatkan dua digit angka random.
 * @return {number}
 */
function getRandomTwoDigitNumber() {
  let randomNumber = Math.random();
  return Math.floor(randomNumber * 100);
}

/**
 * @param  {(result: number) => void} callback
 * @return {void}
 */
function mainFn(callback) {
  setTimeout(() => {
    let n = getRandomTwoDigitNumber();
    callback(n);
  }, 700);
}

function myOtherCallback(result) {
  console.group('myOtherCallback')
  console.log('result: ' + result);
  console.log('tambah 10: ' + result + 10);
  console.groupEnd('myOtherCallback')

}

function count_100_000_sync() {
  let total = 0;
  for (let i = 0; i < 100000; i++) {
    total += 1;
  }

  console.log('done sync: ' + total);
}

function count_100_000_async() {
  return new Promise(function (resolve) {
    let total = 0;
    for (let i = 0; i < 100000; i++) {
      total += 1;
    }
    resolve(total);
  });
}

// Main program starts here

console.log('memanggil mainFn, mohon tunggu sebentar...')

mainFn(function myCallback(result) {
  console.group('myCallback')
  console.log('result: ' + result);
  console.log('kali 1000: ' + result * 100);
  console.groupEnd('myCallback')
});

// mainFn(myOtherCallback);

count_100_000_async().then(function (total) {
  console.log('done async! ' +  total);
});

count_100_000_sync();

console.log('hihi');
