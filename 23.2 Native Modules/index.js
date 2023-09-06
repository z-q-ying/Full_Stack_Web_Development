// Node.js v18.17.1 documentation
// https://nodejs.org/docs/latest-v18.x/api/addons.html
// File system: The node:fs module enables interacting with the file system in a way modeled on standard POSIX functions
const fs = require('fs');

// Writting files with Node.js
const content = 'Hello from Node!';
fs.writeFile('msg.txt', content, err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});

// Reading files with Node.js
fs.readFile('./msg.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
