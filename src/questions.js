const { Question } = require('./question');
const { parseName, validateName, parseDOB, validateDOB, parseHobbies, validateHobbies, parseNumber, validateNumber, parseAddress, validateAddress } = require('./parsersAndValidators.js');

const nameQuestion = () => {
  return new Question(
    'Please enter your name: ',
    'name',
    'The name you entered is not valid.',
    validateName,
    parseName,
  );
};

const DOBQuestion = () => {
  return new Question(
    'Please enter your date of birth (yyyy-mm-dd): ',
    'DOB',
    'The date you entered is not valid.',
    validateDOB,
    parseDOB
  );
};

const hobbiesQuestion = () => {
  return new Question(
    'Please enter your hobbies (comma separated) ',
    'hobbies',
    'You have to enter at least one hobby.',
    validateHobbies,
    parseHobbies,
  );
};

const phoneQuestion = () => {
  return new Question(
    'Please Enter your phone number: ',
    'phone',
    'Phone number you entered is not valid.',
    validateNumber,
    parseNumber,
  );
};

const line1Question = () => {
  return new Question(
    'Please Enter your address line 1: ',
    'address',
    'Address can not be empty.',
    validateAddress,
    parseAddress,
  );
};

const line2Question = () => {
  return new Question(
    'Please Enter your address line 2: ',
    'address',
    'Address can not be empty.',
    validateAddress,
    parseAddress,
  );
};


module.exports = {
  line2Question,
  nameQuestion,
  line1Question,
  phoneQuestion,
  DOBQuestion,
  hobbiesQuestion
};
