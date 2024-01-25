import React from 'react';
import MCQPanel from '../../components/question/MCQPanel';
import SubmitButton from '../../components/button/SubmitButton';
import QuizNavigation from '../../components/quiz/QuizNavigation';
import TrueFalse from '../../components/question/TrueFalsePanel';
import TextAnswer from '../../components/question/TextAnswerPanel';
import MenuBar from '../../components/MenuBar';
import QuizSubheader from '../../components/quiz/QuizSubheader';
import { useSelector } from 'react-redux';

const QuizScreen = () => {
  const showNav = useSelector((state)=>state.showNav.value)
  // Sample questions, replace with your data fetching logic
  const questions = [
    {
      text: 'What is the capital of France?lewqkjfneflqwfn  wejifnlqwinf jwenfljewnf wnlfnlqw qwnflnqwefljq hwfljqwnflq wnlfnuqwlenfulnl wedwnqke bwlfenqwen nfqewfiun nfilqnweufn inlfnqewfl liuqfnlqiwef  liunflqewnf fuluieqn uwenfluiqenf el ulweuflqnfl wuWhat is the capital of France?lewqkjfneflqwfn  wejifnlqwinf jwenfljewnf wnlfnlqw qwnflnqwefljq hwfljqwnflq wnlfnuqwlenfulnl wedwnqke bwlfenqwen nfqewfiun nfilqnweufn inlfnqewfl liuqfnlqiwef  liunflqewnf fuluieqn uwenfluiqenf el ulweuflqnfl wu',
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
  <div className='flex flex-col w-screen lg:w-full'>
    <MenuBar/>
    <QuizSubheader/>
    <div className="flex">
      <div className="quiz-screen p-4 w-screen">
        <div className="flex justify-between mb-4">
              <MCQPanel
                question={questions[currentQuestion]}
                onOptionSelect={handleOptionSelect}
                currentQuestion={currentQuestion}
                totalQuestions={questions.length}
              />
          

            {/* <TrueFalse question={questions[currentQuestion]?.text}
              options={questions[currentQuestion]?.choices}
              onAnswerSelect={handleOptionSelect}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length}/> */}

                {/* <TextAnswer question={questions[currentQuestion]?.text}
              options={questions[currentQuestion]?.choices}
              currentQuestion={currentQuestion}
              totalQuestions={questions.length} /> */}
        </div>

        
        <div className={`fixed sm:w-full h-12 border-black border-t-[1px] border-r-[1px] bottom-0 left-0 right-0 bg-white p-4 flex justify-between items-center transition-all ease-out duration-500 ${showNav ? 'md:w-[calc(100%_-_16rem)]' : 'w-full'}`}>
          <div className="mb-0">
            <p className="text-md md:text-lg font-semibold">
              Question {currentQuestion + 1} out of {questions.length}
            </p>
          </div>

          <div className="flex items-center space-y-0 space-x-4">
              <SubmitButton label="Previous" onClick={() => handlePrevious()} />
              <SubmitButton label="Next" onClick={handleNextQuestion} />
          </div>
        </div>

      </div>
      <div className={`h-screen z-10 absolute md:sticky md:top-0 right-0 border-l-[1px] border-black bg-LightBlue transition-all ease-out flex-shrink duration-500 ${showNav ? 'w-[16.1rem]' : 'w-0'}`}>
        <div className={`dropdown-list ${showNav ? 'sm:w-36 md:w-[15.9rem]' : 'w-0'} flex items-start justify-around`}>
          {(
            <>
              <QuizNavigation/>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
  );
};

export default QuizScreen;
