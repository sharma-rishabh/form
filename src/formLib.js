const getQuestion = () => {
  const name = {
    currentQuestion: 'Please enter your name: ',
    nextStatement: 'Please enter your date of birth (yyyy-mm-dd): ',
    relatedToField: 'name'
  };
  const dob = {
    currentQuestion: 'Please enter your date of birth (yyyy-mm-dd): ',
    nextStatement: 'Please enter your hobbies (comma separated) ',
    relatedToField: 'dob'
  };
  const hobbies = {
    currentQuestion: 'Please enter your hobbies (comma separated) ',
    nextStatement: 'Please enter your date of birth (yyyy-mm-dd): ',
    relatedToField: 'dob'
  };

  return [name, dob, hobbies];
};