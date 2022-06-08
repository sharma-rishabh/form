const { displayNextStatement, saveAnswer } = require('./src/formLib.js');
const { Form } = require('./src/form.js');

const { nameQuestion, DOBQuestion, hobbiesQuestion, phoneQuestion, line1Question, line2Question } = require("./src/questions.js");

const writeToFile = (string) => {
  fs.writeFileSync('./answers.json', string, 'utf8');
};

const takeInput = (callBack, form) => {
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const trimmedChunk = chunk.trim();
    const isResponseValid = callBack(trimmedChunk, form);
    displayNextStatement(form, isResponseValid);
  });

  process.stdin.on('end', () => writeToFile(form.responseToJSON()));
};

const formMain = () => {
  const form = new Form();
  form.addQuestion(nameQuestion());
  form.addQuestion(DOBQuestion());
  form.addQuestion(hobbiesQuestion());
  form.addQuestion(phoneQuestion());
  form.addQuestion(line1Question());
  form.addQuestion(line2Question());

  form.currentQuestion().displayStatement();

  takeInput(saveAnswer, form);
};

formMain();