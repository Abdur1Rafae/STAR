// QuestionBankSelection.js

import React, { useState } from 'react';
import SearchBar from '../../components/Teacher/SearchBar';
import QuestionBankCard from '../../components/Teacher/QuestionBankCard';
import AddQuestions from '../../pages/Teacher/AddQuestions';
import DisplayOnlyQuestions from '../../components/Teacher/DisplayOnlyQuestions';
import { useEffect } from 'react';
import { useQuestionContext } from '../../Context/QuestionsContext';



const QuestionBankSelection = () => {
  const { questions , setQuestions} = useQuestionContext();
  const [selectedCards, setSelectedCards] = useState([]);
  const [questionBanks, setQuestionBanks] = useState({
    "Bank A": [
      {
        type: "MCQ",
            question: "BANK A -- Who developed the theory of relativity?",
            options: [
              { text: "Isaac Newton", isCorrect: false },
              { text: "Albert Einstein", isCorrect: true },
              { text: "Stephen Hawking", isCorrect: false },
              { text: "Galileo Galilei", isCorrect: false }
            ],
            imageUrl: "https://scitechdaily.com/images/Theory-of-Relativity-Physics-Concept.jpg",
            explanation: "Albert Einstein developed the theory of relativity.",
            skill: "Physics",
            difficulty: "Hard",
            point: 20
      },
      {
        type: "MCQ",
        question: "BANK A2 --Who developed the theory of relativity?",
        options: [
          { text: "Isaac Newton", isCorrect: false },
          { text: "Albert Einstein", isCorrect: true },
          { text: "Stephen Hawking", isCorrect: false },
          { text: "Galileo Galilei", isCorrect: false }
        ],
        imageUrl: "https://scitechdaily.com/images/Theory-of-Relativity-Physics-Concept.jpg",
        explanation: "Albert Einstein developed the theory of relativity.",
        skill: "Physics",
        difficulty: "Hard",
        point: 20
      },
      // More questions for Bank A...
    ],
    "Bank B": [
      {
        type: "MCQ",
        question: "BANK B -- Who developed the theory of relativity?",
        options: [
          { text: "Isaac Newton", isCorrect: false },
          { text: "Albert Einstein", isCorrect: true },
          { text: "Stephen Hawking", isCorrect: false },
          { text: "Galileo Galilei", isCorrect: false }
        ],
        imageUrl: "https://scitechdaily.com/images/Theory-of-Relativity-Physics-Concept.jpg",
        explanation: "Albert Einstein developed the theory of relativity.",
        skill: "Physics",
        difficulty: "Hard",
        point: 20.
      },
      // More questions for Bank B...
    ],
    // Add more banks as needed...
  });

  // Function to handle the click event on a card
  const handleCardClick = (bankName) => {
    // Check if the bank is already selected
    const isSelected = selectedCards.includes(bankName);

    // Toggle the selection state
    if (isSelected) {
      // If selected, remove it from the selectedCards array
      setSelectedCards(selectedCards.filter((item) => item !== bankName));
    } else {
      // If not selected, add it to the selectedCards array
      setSelectedCards([...selectedCards, bankName]);
    }
  };
  // Filter questions based on selected banks
  const filteredQuestions = Object.keys(questionBanks)
    .filter((bankName) => selectedCards.includes(bankName))
    .map((bankName) => questionBanks[bankName])
    .flat();
      // Function to update the questions array with questions from selected banks
      const updateQuestionsFromSelectedBanks = () => {
        let updatedQuestions = questions;

        // Iterate through selected banks
        {selectedCards && selectedCards.forEach((bankName) => {
        // Check if the selected bank exists in the questionBanks object
            // If the bank exists, add its questions to the updatedQuestions array
            updatedQuestions = updatedQuestions.concat(questionBanks[bankName]);
        
        });
    }
        // Update the questions array with the questions from selected banks
        setQuestions(updatedQuestions);
        return updatedQuestions;
    };

    useEffect(() => {
      setQuestions(state => ({
        ...state,
        questions: [...updateQuestionsFromSelectedBanks()],
      }));
    }, []);
    //     updateQuestionsFromSelectedBanks();
    // }, [selectedCards, questionBanks]);



  return (
    <div className='flex flex-col gap-4'>
      <div className='md:w-3/4 w-full'>
        <SearchBar />
      </div>
      <div className='flex flex-wrap gap-8'>
        {Object.keys(questionBanks).map((bankName) => (
          <QuestionBankCard
            key={bankName}
            isselection={selectedCards.includes(bankName)}
            onClick={() => handleCardClick(bankName)}
          />
        ))}
      </div>
      <div>
      {filteredQuestions.map((question, index)=> {
                        return <DisplayOnlyQuestions skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
                        })}
       
      </div>
    </div>
  );
};

export default QuestionBankSelection;
