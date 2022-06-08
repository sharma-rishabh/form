const { saveAnswer } = require('./src/formLib.js');
const { Form } = require('./src/form.js');
const fs = require('fs');

const { nameQuestion, DOBQuestion, hobbiesQuestion, phoneQuestion, line1Question, line2Question } = require("./src/questions.js");

const writeToFile = (string) => {
  fs.writeFileSync('./answers.json', string, 'utf8');
};

const formMain = () => {
  const form = new Form();
  form.addQuestion(nameQuestion());
  form.addQuestion(DOBQuestion());
  form.addQuestion(hobbiesQuestion());
  form.addQuestion(phoneQuestion());

  console.log(form.getPrompt());

  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const trimmedChunk = chunk.trim();
    saveAnswer(trimmedChunk, form);
  });

  process.stdin.on('end', () => writeToFile(form.responseToJSON()));
};

formMain();