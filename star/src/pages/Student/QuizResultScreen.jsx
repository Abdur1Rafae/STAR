// QuizResultScreen.js

import React from 'react';      
import ResultSummary from '../../components/ResultSummary';
import SubmitMCQPanel from '../../components/SubmitMCQPanel';
import QuestionDetail from '../../components/QuestionDetails';


const QuizResultScreen = () => {

  const correctAnswers = 5; // Replace with your actual correct answer count
  const wrongAnswers = 3; // Replace with your actual wrong answer count
  const obtainedMarks = 10; // Replace with your actual obtained marks
    const totalMarks = 20; // Replace with your actual total marks  
    const questionNumbers = [1,2,3,4,5,6,7,8,9,10]; // Replace with your actual question numbers
    const score = 10; // Replace with your actual score
    const difficulty = 'Hard'; // Replace with your actual difficulty level
    const skillTargeted = 'Critical Thinking'; // Replace with your actual skill targeted
    const topic = 'Mathematics'; // Replace with your actual topic
    const questions = [
        {
          text: 'What is the capital of France?lewqkjfneflqwfn  wejifnlqwinf jwenfljewnf wnlfnlqw qwnflnqwefljq hwfljqwnflq wnlfnuqwlenfulnl wedwnqke bwlfenqwen nfqewfiun nfilqnweufn inlfnqewfl liuqfnlqiwef  liunflqewnf fuluieqn uwenfluiqenf el ulweuflqnfl wuWhat is the capital of France?lewqkjfneflqwfn  wejifnlqwinf jwenfljewnf wnlfnlqw qwnflnqwefljq hwfljqwnflq wnlfnuqwlenfulnl wedwnqke bwlfenqwen nfqewfiun nfilqnweufn inlfnqewfl liuqfnlqiwef  liunflqewnf fuluieqn uwenfluiqenf el ulweuflqnfl wu',
          imageurl: 'https://shorturl.at/pxDS5',
          choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
          correctAnswer: 'Paris',
          selectedAnswer: 'Berlin',
          marks:2,
        },
        // Add more demo questions as needed
      ];
      const [currentQuestion, setCurrentQuestion] = React.useState(0);

    return (
    <div className="flex">
      {/* Result Summary Component */}
      <div className="w-2/5 bg-gray-200">
      <ResultSummary correctAnswers={correctAnswers} wrongAnswers={wrongAnswers}  obtainedMarks={obtainedMarks} totalMarks={totalMarks} questionNumbers={questionNumbers}/>
      </div>

      {/* Submit MCQ Panel Component */}
      <div className="w-full bg-white">
        <SubmitMCQPanel  question={questions[currentQuestion]}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}/>
      </div>

      {/* Question Detail Component */}
      <div className="w-1/3 bg-gray-200">
        <QuestionDetail score= {score} difficulty = {difficulty} skillTargeted={skillTargeted} topic={topic}/>
      </div>

      
    </div>
  );
};

export default QuizResultScreen;
