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
};

const parseHobbies = (hobbies) => {
  return hobbies.split(',');
};

exports.parseNumber = parseNumber;
exports.parseHobbies = parseHobbies;
exports.parseDOB = parseDOB;
exports.validateHobbies = validateHobbies;
exports.validateDOB = validateDOB;
exports.validateName = validateName;
exports.validateNumber = validateNumber;
exports.parseAddress = parseAddress;
exports.validateAddress = validateAddress;
exports.parseName = parseName;
