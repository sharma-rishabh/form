const fs = require('fs');
const { Form } = require('./form.js');
const { InputHandler } = require('./inputHandler.js');

const { nameQuestion, DOBQuestion, hobbiesQuestion, phoneQuestion, line1Question, line2Question } = require("./questions.js");

const writeToFile = (string) => {
  fs.writeFileSync('./answers.json', string, 'utf8');
};

const displayNextStatement = (form, isResponseValid) => {
  if (!isResponseValid) {
    form.currentQuestion().displayError();
    form.currentQuestion().displayStatement();
    return;
  }

  if (!form.anyQuestionsLeft()) {
    form.displayEndMessage();
    return;
  }

  form.nextQuestion().displayStatement();

}

const saveAnswer = (answer, form) => {
  if (form.currentQuestion().validator(answer)) {

    const parsedAnswer = form.currentQuestion().parser(answer, form.getResponse());
    form.updateResponse(form.currentQuestion().getType(), parsedAnswer);

    return true;
  }
  return false;
};

const takeInput = (callBack, form) => {
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', (chunk) => {
    const trimmedChunk = chunk.trim();
    const isResponseValid = callBack(trimmedChunk, form);
    displayNextStatement(form, isResponseValid);

  })

  process.stdin.on('end', () => writeToFile(form.responseToJSON()));
};

const formMain = () => {
  const inputHandler = new InputHandler();

  const name = nameQuestion();
  const DOB = DOBQuestion();
  const hobbies = hobbiesQuestion();
  const phoneNum = phoneQuestion();
  const addressLine1 = line1Question();
  const addressLine2 = line2Question();

  const form = new Form();
  form.addQuestion(name);
  form.addQuestion(DOB);
  form.addQuestion(hobbies);
  form.addQuestion(phoneNum);
  form.addQuestion(addressLine1);
  form.addQuestion(addressLine2);

  form.currentQuestion().displayStatement();

  takeInput((chunk, form) => {
    return inputHandler.processChunk(saveAnswer, chunk, form);
  }, form);
};

formMain();
