const fs = require("fs"); /// to read a file 
const input = process.argv.slice(2); // terminal input 
const request = require('request'); // request info from HTTP

const readline = require('readline'); // for reaading data, in this case, asking questions
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const writeFIle = function (URL, local) {
  URL = input[0];
  local = input[1];

  request(URL, (error, response, body) => { // request body from the url
    if (error) {
      console.log("URL inputted is not valid.");
      process.exit();
    } else {
      console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
      console.log('body:', body); // Print the HTML body
    }

    fs.writeFile(local, body, err => { // take the body of HTML and right it to local(specified path)
      if (err) {
        console.error(`The path specified ${local} doesn't exist`);

      } else {
        if (fs.existsSync(local)) { // if the path that we want to write the info to already exist

          rl.question(`${local} already exist, do you want to continue? (press y)`, (answer) => {

            if (answer.toLowerCase() === 'y') {
              console.log(`Downloaded and saved ${body.length} bytes to ${local}.`);
              rl.close();
            }
          });
        }
      }
    });
  });

};

writeFIle(input);



