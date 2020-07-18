import React from 'react';

function QuizList({ handleClick, quizData, currentQuizIndex }) {
  return (
    <div className="col-md-10 quiz">
      <h6 style={{ color: 'white', fontSize: "22px" }} >{quizData[currentQuizIndex].question}</h6>
      {quizData[currentQuizIndex].answers.map((option, optIndex) => {
        return (
          <ul key={optIndex} className="list-group">
            <li style={{ backgroundColor: option.bgColor , color: option.bgColor === 'green' || option.bgColor === 'red' ? 'white': '' }} className={`list-group-item `} onClick={() => {
                console.log('Each quiz correct answer: ', quizData[currentQuizIndex].correctAnswer, '😇', 'Clicked ->', optIndex);
                let bgColor = quizData[currentQuizIndex].correctAnswer === optIndex ? 'green' : 'red';
                handleClick(optIndex, bgColor)
              }}>{option.answers}</li>
          </ul>
        )
      })}

    </div>
  )
}

export default QuizList;