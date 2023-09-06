/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/


import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

inquirer
  .prompt([
    /* Pass your questions in here */
    {
        message: 'Type in your URL: ', 
        name: "URL"
    }
  ])
  .then((answers) => {
    // Use user feedback for... whatever!!
    var URL = answers.URL;
    console.log(`You typed: ${URL}`);

    // Convert to QR image
    var qr_png = qr.image(URL, { type: 'png' });
    qr_png.pipe(fs.createWriteStream('URL.png'));
    var svg_string = qr.imageSync(URL, { type: 'png' });
    
    // Add txt description
    fs.writeFile('URL.txt', URL, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File written successfully.');
        }
      });    
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });