const fs = require('fs');
const { Form } = require('./form.js');
const { InputHandler } = require('./inputHandler.js');
const { Question } = require('./question');

const { parseName, validateName, parseDOB, validateDOB, parseHobbies,
  validateHobbies, parseNumber, validateNumber, parseAddress,
  validateAddress } = require('./parsersAndValidators.js');

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

  const name = new Question(
    'Please enter your name: ',
    'name',
    parseName,
    validateName,
    'The name you entered is not valid.'
  );

  const DOB = new Question(
    'Please enter your date of birth (yyyy-mm-dd): ',
    'DOB',
    parseDOB,
    validateDOB,
    'The date you entered is not valid.'
  );

  const hobbies = new Question(
    'Please enter your hobbies (comma separated) ',
    'hobbies',
    parseHobbies,
    validateHobbies,
    'You have to enter at least one hobby.'
  );

  const phoneNum = new Question(
    'Please Enter your phone number: ',
    'phone',
    parseNumber,
    validateNumber,
    'Phone number you entered is not valid.'
  );

  const addressLine1 = new Question(
    'Please Enter your address line 1: ',
    'address',
    parseAddress,
    validateAddress,
    'Address can not be empty.'
  );

  const addressLine2 = new Question(
    'Please Enter your address line 2: ',
    'address',
    parseAddress,
    validateAddress,
    'Address can not be empty.'
  );

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