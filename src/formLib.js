const { InputHandler } = require('./inputHandler');

const parseName = (name) => {
  return name.slice(0, -1);
};

const parseDOB = (date) => {
  const dateArray = date.split('-');
  const year = +dateArray[0];
  const month = +dateArray[1];
  const day = +dateArray[2];

  return { year, month, day };
}

const parseHobbies = (hobbies) => {
  const hobbyArray = hobbies.split(',');
  const lastHobby = hobbyArray[hobbyArray.length - 1].slice(0, -1);
  hobbyArray[hobbyArray.length - 1] = lastHobby;
  return hobbyArray;
}

const getQuestion = () => {
  const name = {
    currentQuestion: 'Please enter your name: ',
    nextStatement: 'Please enter your date of birth (yyyy-mm-dd): ',
    relatedToField: 'name',
    parser: parseName
  };
  const dob = {
    currentQuestion: 'Please enter your date of birth (yyyy-mm-dd): ',
    nextStatement: 'Please enter your hobbies (comma separated) ',
    relatedToField: 'dob',
    parser: parseDOB
  };
  const hobbies = {
    currentQuestion: 'Please enter your hobbies (comma separated) ',
    nextStatement: 'Thankyou',
    relatedToField: 'hobbies',
    parser: parseHobbies
  };

  return [name, dob, hobbies];
};

const saveAnswer = (answer, question, answers) => {
  const parsedAnswer = question.parser(answer);
  answers[question.relatedToField] = parsedAnswer;
  console.log(question.nextStatement);
}

const takeInput = (callBack, questions) => {
  process.stdin.setEncoding('utf8');
  const answers = {};
  let questionNumber = 0;
  process.stdin.on('data', (chunk) => {
    callBack(chunk, questions[questionNumber], answers);
    questionNumber++;
  })
  process.stdin.on('end', () => console.log(answers));
};

const formMain = () => {
  const inputHandler = new InputHandler();
  const questions = getQuestion();

  console.log(questions[0].currentQuestion);
  takeInput((chunk, questions, answers) => {
    inputHandler.processChunk(saveAnswer, chunk, questions, answers);
  }, questions);
};

formMain();