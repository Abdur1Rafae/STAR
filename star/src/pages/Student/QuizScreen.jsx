  import React from 'react';
  import MCQPanel from '../../components/MCQPanel';
  import Timer from '../../components/Timer';
  import SubmitButton from '../../components/SubmitButton';
  import QuizNavigation from '../../components/QuizNavigation';
  import TrueFalse from '../../components/TrueFalsePanel';
  import TextAnswer from '../../components/TextAnswerPanel';
  import MenuBar from '../../components/MenuBar';
import QuizSubheader from '../../components/QuizSubheader';

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

  return (
    <div className='flex flex-col w-screen lg:w-full'>
      <MenuBar/>
      <QuizSubheader/>
      <div className="quiz-screen p-4 w-screen lg:w-4/5 border-2 border-black">
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
        </div>

        
        <div className="fixed h-16 bottom-0 left-0 right-0 bg-gray-200	p-4 flex  md:flex-row justify-between items-center">
    <div className="mb-2 md:mb-0">
      {/* "Question x out of y" text */}
      <p className="text-md md:text-lg font-semibold">
        Question {currentQuestion + 1} out of {questions.length}
      </p>
    </div>

    <div className="flex  md:flex-row space-y-2 space-y-0 space-x-4">
      {/* Your Previous Button */}
      <SubmitButton label="Previous" onClick={() => handlePrevious()} />

      {/* Your Next Button */}
      <SubmitButton label="Next" onClick={handleNextQuestion} />
    </div>
  </div>

      </div>
      </div>
    );
  };

  export default QuizScreen;
