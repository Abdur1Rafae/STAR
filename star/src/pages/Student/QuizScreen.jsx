import React from 'react';
import MCQPanel from '../../components/MCQPanel';
import Timer from '../../components/Timer';
import SubmitButton from '../../components/SubmitButton';
import QuizNavigation from '../../components/QuizNavigation';
import QuizImage from '../../components/QuizImage'; 
import TrueFalse from '../../components/TrueFalsePanel';
import TextAnswer from '../../components/TextAnswerPanel';
import QuizMenuBar from '../../components/QuizMenuBar';

const QuizScreen = () => {
  // Sample questions, replace with your data fetching logic
  const questions = [
    {
      text: 'What is the capital of France?',
      imageurl : 'https://shorturl.at/pxDS5',
      choices: ['A. Berlin', 'B. Madrid', 'C. Paris', 'D. Rome'],
      correctAnswer: 'C. Paris',
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

  return (
    <div>
      <QuizMenuBar/>
      <div className="quiz-screen p-4">
        <div className="flex justify-between mb-4">
          {/* <MCQPanel
            question={questions[currentQuestion]?.text}
            options={questions[currentQuestion]?.choices}
            onOptionSelect={handleOptionSelect}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}
          />
          */}

          <TrueFalse question={questions[currentQuestion]?.text}
            options={questions[currentQuestion]?.choices}
            onAnswerSelect={handleOptionSelect}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length}/>

              {/* <TextAnswer question={questions[currentQuestion]?.text}
            options={questions[currentQuestion]?.choices}
            currentQuestion={currentQuestion}
            totalQuestions={questions.length} /> */}

          <QuizImage imageUrl={questions[currentQuestion]?.imageurl} />
          <div className='flex flex-col'>
              
              <div className='pt-2'>
                  <QuizNavigation
                    currentQuestion={currentQuestion}
                    totalQuestions={questions.length}
                    onNextClick={handleNextQuestion}
                  />
              </div>
          </div>
        </div>

        <div className="flex justify-end">
          <SubmitButton
            onClick={handleNextQuestion}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Next Question
          </SubmitButton>
        </div>

        
      </div>
    </div>
  );
};

export default QuizScreen;
