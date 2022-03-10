/**
* @param {import('mysql2').Connection} connection
*/
function getShops(connection) {
  return new Promise((resolve, reject) => {
    connection.execute(`SELECT * from shops`, function (error, result) {
      if (error) {
        return reject(error);
      }

      resolve(result);
    });
  });
}

module.exports = {
  getShops: getShops,
}
