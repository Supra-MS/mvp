let mongoose = require('mongoose');

let quizSchema = new mongoose.Schema({
  question: {
    type: String
  },
  answers: {
    type: Array
  },
  correctAnswer: {
    type: Number
  }
},
  { timestamps: true }
);

module.exports = mongoose.model('quiz', quizSchema);

/*
Quiz.insertMany(quizData)
    .then(() => console.log('Quiz data inserted'))
    .catch((e) => console.log('Error inserting quiz data'));
*/