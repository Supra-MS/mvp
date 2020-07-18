import React from 'react';
import http from '../../src/http-client-axios.js';

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizData: [],
      userAnswer: -1,
      correctAnswer: false
    }
    this.getQuizData = this.getQuizData.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
  }

  componentDidMount() {
    this.getQuizData();
  }

  setAnswer(correctAnswer, userAnswer) {
    if (correctAnswer === userAnswer) {
      /* this.setState({
        correctAnswer: true
      }) */

      this.setState(prevState => {
      console.log(prevState.userAnswer)
      return {
        correctAnswer: true
      }
    })

    }


    console.log('USer answer: ', this.state.userAnswer)
  }

  getQuizData() {
    http.get('/quiz')
      .then(response => {
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
    let { quizData, userAnswer } = this.state;
    return (
      <div className="jumbotron">
        <div className="list row">
          {quizData.length > 0 && quizData.map((eachQuiz, index) => {

            return (
                <div key={`ab${index + 90}`} className="col-md-10 quiz">
                  <h6 style={{color: 'white', fontSize: "22px"}} >{eachQuiz.question}</h6>
                  {eachQuiz.answers.map((option, optIndex) => {
                    {/* console.log('opt: ',optIndex, option) */}
                    return (

                      <ul key={optIndex} className="list-group">
                        <li className={`list-group-item ${this.state.correctAnswer ? "correct" : "incorrect"}`} onClick={()=>{
                          console.log('Each quiz correct answer: ', eachQuiz.correctAnswer, '😇', 'Clicked ->', optIndex);
                          // if ()
                          this.setAnswer(eachQuiz.correctAnswer, optIndex)
                        }} >{option}</li>
                      </ul>
                    )
                  })}
                </div>
              )
          })}

        </div>

      </div>
    )
  }
}



export default Quiz;