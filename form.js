const fs = require('fs');
const { saveAnswer } = require('./src/formLib.js');
const { createForm } = require('./src/createForm.js');

const formMain = () => {
  const form = createForm();

  console.log(form.getPrompt());

  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (chunk) => {
    const trimmedChunk = chunk.trim();
    saveAnswer(trimmedChunk, form, console.log, fs.writeFileSync);
  });

};

formMain();
