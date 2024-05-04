import React from 'react';      
import ResultSummary from '../../components/Student/StudentResultSummary';
import SubmitMCQPanel from '../../components/Student/question/SubmitMCQPanel';
import QuestionDetail from '../../components/Student/QuestionDetails';
import FeedbackCard from '../../components/Student/FeedbackCard';

const QuizResultScreen = () => {

  const correctAnswers = 5;
  const wrongAnswers = 3; 
  const obtainedMarks = 10;
    const totalMarks = 20;  
    const questionNumbers = [{number:1, status: 1 },{number:2, status: 0 }, {number:3, status: 1 }, {number:4, status: 1 },
      {number:5, status: 0 }, {number:6, status: 1 }, {number:7, status: 0 }, {number:8, status: 0 }, {number:9, status: 1 }, {number:10, status: 0 }]; 
    const score = 10; 
    const difficulty = 'Hard';
    const skillTargeted = 'Critical Thinking';
    const topic = 'Mathematics';
    const questions = [
        {
          text: 'What is the capital of France?lewqkjfneflqwfn  wejifnlqwinf jwenfljewnf wnlfnlqw qwnflnqwefljq hwfljqwnflq wnlfnuqwlenfulnl wedwnqke bwlfenqwen nfqewfiun nfilqnweufn inlfnqewfl liuqfnlqiwef  liunflqewnf fuluieqn uwenfluiqenf el ulweuflqnfl wuWhat is the capital of France?lewqkjfneflqwfn  wejifnlqwinf jwenfljewnf wnlfnlqw qwnflnqwefljq hwfljqwnflq wnlfnuqwlenfulnl wedwnqke bwlfenqwen nfqewfiun nfilqnweufn inlfnqewfl liuqfnlqiwef  liunflqewnf fuluieqn uwenfluiqenf el ulweuflqnfl wu',
          imageurl: 'https://shorturl.at/pxDS5',
          choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
          correctAnswer: 'Paris',
          selectedAnswer: 'Berlin',
          marks:2,
        },
      ];
      const [currentQuestion, setCurrentQuestion] = React.useState(0);

    return (
    <div className="flex md:flex-row flex-col gap-4">
      <div className="h-auto">
        <ResultSummary correctAnswers={correctAnswers} 
          wrongAnswers={wrongAnswers}  
          obtainedMarks={obtainedMarks} 
          totalMarks={totalMarks} 
          questionNumbers={questionNumbers}/>
      </div>

      <div className="w-full bg-LightBlue">
        <SubmitMCQPanel  question={questions[currentQuestion]}
          currentQuestion={currentQuestion}
          totalQuestions={questions.length}/>
      </div>

      <div className="md:w-1/3 bg-LightBlue drop-shadow-md">
        <QuestionDetail score= {score} difficulty = {difficulty} skillTargeted={skillTargeted} topic={topic}/>
        <hr class="h-px mt-8 border-[1px] border-black mx-2"></hr>
        <FeedbackCard/>
      </div>

      
    </div>
  );
};

export default QuizResultScreen;
