'use strict';

const fs = require('fs');

const storage = module.exports = {};

const databaseDir = `${__dirname}/../../data`;

storage.get = id => {

  return new Promise((resolve, reject) => {
    if (!id) { reject('ERROR: No ID provided on data'); }

    let file = `${databaseDir}/${id}.json`;
    fs.readFile(file, (err, data) => {
      if (err) { reject(err); }

      if (data) {
        let obj = JSON.parse(data.toString());
        resolve(obj);
      }
    });

  });
};

storage.delete = id => {

  return new Promise((resolve, reject) => {
    if (!id) { reject('ERROR: No ID provided on data'); }

    let file = `${databaseDir}/${id}.json`;
    fs.unlink(file, err => {
      if (err) { reject(err); }
      console.log(`${id} has been deleted`);

    });
  });
};

storage.save = data => {

  return new Promise((resolve, reject) => {
    if (!data.id) { reject('ERROR: No ID provided on data'); }

    let file = `${databaseDir}/${data.id}.json`;
    let text = JSON.stringify(data);

    fs.writeFile(file, text, (err) => {
      if (err) { reject(err); }
      resolve(data);
    });

  });
};