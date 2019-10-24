//const con = require('./constants.js');
const arg = process.argv;
const URL = arg[2];
const path = arg[3];
const request = require('request');
const readline = require('readline');
const fs = require('fs');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


const fetcher = function(URL, path) {

  request(URL, (error, response, body) => {
    if (response < 200 && response > 300) {
      console.log('error:', error);
      console.log('statusCode:', response && response.statusCode);
      process.exit();
    } else {
      fs.open(path, 'wx', (err, fd) => {
        if (err) {
          if (err.code === 'EEXIST') {
            rl.question(`${path} already exists. To overwrite Press Y then enter, or press any other key to exit `, (answer1) => {
              if (answer1 === 'y' || answer1 === 'Y') {
                fs.writeFile(path, body, (err) => {
                  if (err) throw err;
                  console.log('The file has been overwritten!');
                });
              } else {
                process.exit();
              }
              rl.close();
            });
          } else {
            console.error(`${path} directory does not exist`);
            process.exit();
          }
        } else {
          fs.writeFile(path, body, (err) => {
            if (err) throw err;
            console.log('The file has been saved!');
            process.exit();
          });
        }
      });
    }
  });

  
};


// const fetcher = function(URL, path) {

//   request(URL, (error, response, body) => {
//     fs.open(path, 'wx', (err, fd) => {
//       if (err) {
//         if (err.code === 'EEXIST') {
//           console.error(`${path} already exists`);
//           return;
//         }
    
//         throw err;
//       }
    
//       fs.writeFile(path, body, (err) => {
//         if (err) throw err;
//         console.log('The file has been saved!');
//       });
//     });
//     console.log('error:', error);
//     console.log('statusCode:', response && response.statusCode);
//   });

  
// };



fetcher(URL, path);