const { Question } = require('./question');
const { parseName, validateName, parseDOB, validateDOB, parseHobbies, validateHobbies, parseNumber, validateNumber, parseAddress, validateAddress } = require('./parsersAndValidators.js');

const nameQuestion = () => {
  return new Question(
    'Please enter your name: ',
    'name',
    parseName,
    validateName,
    'The name you entered is not valid.'
  );
};
exports.nameQuestion = nameQuestion;
const DOBQuestion = () => {
  return new Question(
    'Please enter your date of birth (yyyy-mm-dd): ',
    'DOB',
    parseDOB,
    validateDOB,
    'The date you entered is not valid.'
  );
};
exports.DOBQuestion = DOBQuestion;
const hobbiesQuestion = () => {
  return new Question(
    'Please enter your hobbies (comma separated) ',
    'hobbies',
    parseHobbies,
    validateHobbies,
    'You have to enter at least one hobby.'
  );
};
exports.hobbiesQuestion = hobbiesQuestion;
const phoneQuestion = () => {
  return new Question(
    'Please Enter your phone number: ',
    'phone',
    parseNumber,
    validateNumber,
    'Phone number you entered is not valid.'
  );
};
exports.phoneQuestion = phoneQuestion;
const line1Question = () => {
  return new Question(
    'Please Enter your address line 1: ',
    'address',
    parseAddress,
    validateAddress,
    'Address can not be empty.'
  );
};
exports.line1Question = line1Question;
const line2Question = () => {
  return new Question(
    'Please Enter your address line 2: ',
    'address',
    parseAddress,
    validateAddress,
    'Address can not be empty.'
  );
};
exports.line2Question = line2Question;
