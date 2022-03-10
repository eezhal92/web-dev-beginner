// Simulasi membuat fungsi yang bertugas untuk
// mendapatkan angka genap acak
// bila kita bisa menghasilkan angka genap,
// promise akan resolved (berhasil)
// bila mendapatkan angka ganjil, promise akan rejected (gagal)

function getRandomEvenNumber() {
  return new Promise(function (resolve, reject) {

    // baris kode untuk mendapatkan angka random
    let randomNumber = Math.floor(Math.random() * 100);
    // check apakah angka genap atau tidak
    let isEven = randomNumber % 2 == 0;

    if (isEven) {
      // kita panggil resolve untuk menandakan operasi asynchronous berhasil
      resolve(randomNumber);
      return;
    }

    // sedang reject dipanggil ketika operasi gagal
    reject(new Error(`Gagal mendapatkan angka genap.`));
  });
}

getRandomEvenNumber().then(aNumber => {
  console.log({ aNumber });
})
.catch((error) => {
  console.error('Oops' + error.message);
});

// getRandomEvenNumber().then((aNumber) => {
//   return aNumber + 100;
// })
// .then((anotherNumber) => {
//   console.log({ anotherNumber });
// });

/**
 * @param {string} str
 */
function getStringLength(str) {
  return new Promise((resolve, reject) => {
    if (!str || typeof str !== 'string') {
      reject(new Error('Mohon beri argumen string'));
      return;
    }
    resolve(str.length);
  });
}

getStringLength('abc')
  .then((len) => len * 2)
  .then(hasil => {
    console.log({ hasil });
  });

// fungsi fetch digunakan untuk membuat request ke remote server
// contoh: mengambil data, menyimpan atau menghapus data
// ambil data pokemon dari pokeapi.co
fetch('https://pokeapi.co/api/v2/pokemon/ditto')
  .then(response => response.json())
  .then(function (data) {
    console.log({ ditto: data });
  });

let returnedPromise = fetch('https://pokeapi.co/api/v2/pokemon/bulbasaur')

returnedPromise
  .then(response => response.json())
  .then(function (data) {
    console.log({ bulba: data });
  });
