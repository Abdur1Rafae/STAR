import React from 'react';
import MCQPanel from '../../components/MCQPanel';
import Timer from '../../components/Timer';
import SubmitButton from '../../components/SubmitButton';
import QuizNavigation from '../../components/QuizNavigation';
import TrueFalse from '../../components/TrueFalsePanel';
import TextAnswer from '../../components/TextAnswerPanel';
import QuizMenuBar from '../../components/QuizMenuBar';

const QuizScreen = () => {
  // Sample questions, replace with your data fetching logic
  const questions = [
    {
      text: 'What is the capital of France?',
      imageurl: 'https://shorturl.at/pxDS5',
      choices: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 'Paris',
      marks:2,
    },
    // Add more demo questions as needed
  ];

  const [currentQuestion, setCurrentQuestion] = React.useState(0);

  const handleOptionSelect = (selectedOption) => {
    // Logic to handle option selection
  };

  const handleNextQuestion = () => {
    // Logic to move to the next question
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
  };

  const handlePrevious = () => {
    // Logic to move to the next question
    setCurrentQuestion((prevQuestion) => prevQuestion - 1);
  };

  return (
    <div className="flex flex-col min-h-screen ">
      <QuizMenuBar />
      <div className="quiz-screen flex-grow p-4">
        <div className="flex justify-between mb-4">
          {/* <MCQPanel
            question={questions[currentQuestion]}
            onOptionSelect={handleOptionSelect}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          /> */}
          
          {/* <TrueFalse
            question={questions[currentQuestion]}
            onAnswerSelect={handleOptionSelect}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          /> */}

          <TextAnswer
            question={questions[currentQuestion]}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />

          <div className='flex flex-col '>
            <div className='pt-2'>
              <QuizNavigation
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
                onNextClick={handleNextQuestion}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-200 p-4 flex justify-between items-center">
        <div>
          {/* "Question x out of y" text */}
          <p className="text-lg font-semibold">
            Question {currentQuestion + 1} out of {questions.length}
          </p>
        </div>

        <div className="flex space-x-4">
          {/* Your Previous Button */}
          <SubmitButton label="Previous" onClick={() => handlePrevious()} />

          {/* Your Next Button */}
          <SubmitButton label="Next" onClick={handleNextQuestion} />
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;
