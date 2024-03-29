const path = require('path');
const fs = require('fs');

exports.getSchemaSQL = () => new Promise((resolve, reject) => {
  fs.readFile(path.join(__dirname, 'schema.sql'), 'utf8', (err, data) => {
    if (err) return reject(err);
    return resolve(data);
  });
});
