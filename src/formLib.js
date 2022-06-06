const fs = require('fs');
const { Form } = require('./form');
const { InputHandler } = require('./inputHandler');
const { Question } = require('./question');

const writeToFile = (string) => {
  fs.writeFileSync('./answers.json', string, 'utf8');
};

const parseNumber = (number) => number;

const validateNumber = (number) => {
  const isValidNumber = /^\d{10,10}$/;
  return isValidNumber.test(number);
};

const parseAddress = (address, prevOption) => {
  if (prevOption.address) {
    return prevOption.address + '\n' + address;
  }
  return address;
};

const validateAddress = (address) => address.length > 0;

const parseName = (name) => {
  return name;
};

const validateName = (name) => {
  return /^[a-z]{5,}$/i.test(name);
};

const validateDOB = (date) => {
  const isDate = /^\d{4}-\d{2}-\d{2}$/;
  return isDate.test(date);
};

const validateHobbies = (hobbies) => {
  return hobbies.length > 0;
};

const parseDOB = (date) => {
  const dateArray = date.split('-');
  const year = +dateArray[0];
  const month = +dateArray[1];
  const day = +dateArray[2];

  return { year, month, day };
}

const parseHobbies = (hobbies) => {
  return hobbies.split(',');
}

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