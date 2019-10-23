const arg = process.argv;
const URL = arg[2];
const path = arg[3];
const request = require('request');
const fs = require('fs');

const fetcher = function(URL, path) {

  request(URL, (error, response, body) => {
    fs.open(path, 'wx', (err, fd) => {
      console.log(path);
      if (err) {
        if (err.code === 'EEXIST') {
          console.error(`${path} already exists`);
          return;
        }
    
        throw err;
      }
    
      fs.writeFile(path, body, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    });
    console.log('error:', error);
    console.log('statusCode:', response && response.statusCode);
  });

  
};

fetcher(URL, path);