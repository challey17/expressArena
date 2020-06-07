const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("hello express!");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("your pizza is on the way!");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("We don't serve pineapples!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
      Base URL: ${req.baseUrl}
      Host: ${req.hostname}
      Path: ${req.path}
    `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});
//QUERY PARAMATER EXAMPLE
app.get("/greetings", (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if (!name) {
    //3. name was not provided
    return res.status(400).send("Please provide a name amigo");
  }

  if (!race) {
    //3. race was not provided
    return res.status(400).send("Please provide a race");
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, welcome to our kingdom.`;

  //6. send the response
  res.send(greeting);
});

/* Create a route handler function on the path /sum that accepts two query parameters 
named a and b and find the sum of the two values. Return a string in the format "The sum of a and b is c".
 Note that query parameters are always strings so some thought should be given to converting them to numbers.*/

app.get("/sum", (req, res) => {
  let requiredFields = ["a", "b"];
  requiredFields.forEach((field) => {
    if (!req.query[field]) {
      res.status(400).send(`${field} is required`);
    }
  });
  let { a, b } = req.query;
  const numberA = parseInt(a);
  const numberB = parseInt(b);

  res.send(`the sum of a and b is ${numberA + numberB}`);
});

/* Create an endpoint /cipher. The handler function should accept a 
query parameter named text and one named shift. Encrypt the text using
 a simple shift cipher also known as a Caesar Cipher. It is a simple 
 substitution cipher where each letter is shifted a certain 
 number of places down the alphabet. So if the shift was 1 then 
 A would be replaced by B, and B would be replaced by C and C would be 
 replaced by D and so on until finally Z would be replaced by A. 
 using this scheme encrypt the text with the given shift and return 
 the result to the client. Hint - String.fromCharCode(65) is an 
 uppercase A and 'A'.charCodeAt(0) is the number 65. 65 is 
 the integer value of uppercase A in UTF-16. 
 See the documentation for details. */

app.get("/cipher", (req, res) => {
  let requiredFields = ["text", "shift"];
  requiredFields.forEach((field) => {
    if (!req.query[field]) {
      res.status(400).send(`${field} is required`);
    }
  });
  let { text, shift } = req.query;
  const numShift = parseInt(shift);

  //need to loop through text
  let encrypedText = "";

  for (let i = 0; i < text.length; i++) {
    encrypedText += text[i];
  }

  res.send(encrypedText);
});

app.listen(8000, () => {
  console.log("Express server listening on http://localhost:8000/");
});
