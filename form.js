const fs = require('fs');
const { saveAnswer } = require('./src/formLib.js');
const { Form } = require('./src/form.js');

const lib = require("./src/questions.js");
const { nameQuestion, DOBQuestion, hobbiesQuestion, phoneQuestion } = lib;

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
    saveAnswer(trimmedChunk, form, console.log, fs.writeFileSync);
  });
};

formMain();