import React from 'react';
import QuizList from './QuizList.js';
import http from '../../src/http-client-axios.js';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: [],
      currentQuiz: 0,
      correctAnswers: [],
      enablePlayAgain: false,
      finishedQuestions: []
    }
    this.getQuizData = this.getQuizData.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getQuizData();
  }

  handleClick(answerIndex, bgColor) {
    let { currentQuiz, quizData, correctAnswers, finishedQuestions } = this.state;

    if (finishedQuestions.indexOf(currentQuiz) === -1) {
      finishedQuestions.push(currentQuiz);
      quizData[currentQuiz].answers[answerIndex].bgColor = bgColor;

      if (bgColor === 'green') {
        correctAnswers.push(currentQuiz);
      }

      this.setState({ quizData: quizData, correctAnswers, finishedQuestions }, () => {
        if (quizData.length - 1 > currentQuiz) {
          setTimeout(() => {
            this.setState({
              currentQuiz: currentQuiz + 1
            })
          }, 1000);

        } else {
          console.log('Game over');
          this.setState({
            enablePlayAgain: true
          })
        }

      })
    }
  }

  playAgain() {
    this.getQuizData();
    this.setState({
      currentQuiz: 0,
      correctAnswers: [],
      enablePlayAgain: false
    })
  }

  getQuizData() {
    http.get('/quiz')
      .then(response => {
        response.data.map((question, i) => {
          let customAnswers = [];
          question.answers.map((ans, j) => {
            let customStyle = {}
            customAnswers.push({ answers: ans, bgColor: '' })
          });
          question.answers = customAnswers;
        });

        this.setState({
          quizData: response.data
        })
        console.log('Quiz data response: ', response.data);
      })
      .catch(error => {
        console.log('Error retrieving quiz data: ', error);
      })
  }

  render() {
    let { quizData, userAnswer, currentQuiz, correctAnswers } = this.state;
    return (
      <div className="jumbotron">
      {!this.state.enablePlayAgain ?
      <div>
        {quizData.length ? <QuizList quizData={quizData} handleClick={this.handleClick} currentQuizIndex={currentQuiz} /> : null}
        </div>
       :
        <div style={{textAlign: 'center'}}>
          <p style={{color: 'rgb(69, 104, 105)', fontSize: '30px'}}>{`You have got ${correctAnswers.length}/${quizData.length} Correct answers!!!`}</p>
          <button className="btn-warning" onClick={this.playAgain.bind(this)}>Play Again</button>
        </div>
      }
      </div>
    )
  }
}


export default Quiz;
