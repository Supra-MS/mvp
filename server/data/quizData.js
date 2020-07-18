let quizData = [
  {
    question: `In the following code, function foo (x=20) {...}, what does "x=20" accomplish?`,
    answers: [`The function will only accept arguments which are equal to 20.`,
    `It assigns x a default value of 20 if the argument passed to the function is "falsy".`, `It assigns x a default value of 20 if the argument passed to the function is undefined.`, `Any value passed to the function gets changed to 20.`],
    correctAnswer: 2
  },
  {
    question: `What will be logged to the console when the following code is executed:
    { const a = 2; a = 3; console.log(a); }`,
    answers: [`Syntax Error`, 2, `Type Error`, 3],
    correctAnswer: 2
  },
  {
    question: `With ES6, this is valid JavaScript:`,
    answers: ['True', 'False'],
    correctAnswer: 0
  },
  {
    question: `What will be logged to the console when the following code is executed:
    { const c; c = 1; }`,
    answers: [`Syntax Error`, 'undefined', `Type Error`, 1],
    correctAnswer: 0
  },
  {
    question: `What will be logged to the console when the following code is executed:
    { const c = [1, 2]; c.push(3); console.log(c) }`,
    answers: [`Syntax Error`, '[1, 2, 3]', `Type Error`],
    correctAnswer: 1
  },
  {
    question: `What will be logged to the console upon execution of the code below:
    { a = 3; var a; console.log(a); }`,
    answers: ['null', 'undefined', 'a', 3],
    correctAnswer: 3
  },
  {
    question: `Declarations themselves are hoisted, but assignments, even assignments of function expressions, are not hoisted.`,
    answers: ['True', 'False'],
    correctAnswer: 0
  }
];

module.exports = quizData;