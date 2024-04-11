import React, { useState, useContext } from 'react';
import SearchBar from '../../components/Teacher/SearchBar';
import QuestionBankCard from '../../components/Teacher/QuestionBankCard';
import DisplayOnlyQuestions from '../../components/Teacher/DisplayOnlyQuestions';
import { useEffect } from 'react';
import { QuestionContext } from '../../Context/QuestionsContext';
import QuestionBankSelectionbars from './QuestionBankSelectionbars';

const QuestionBankSelection = () => {
  const { addQBQuestions, removeQBQuestions } = useContext(QuestionContext);
  const [selectedCard, setSelectedCard] = useState([]);
  const [questionBanks, setQuestionBanks] = useState({
    "Bank A": [
      {
        type: "MCQ",
        question: "Who developed the theory of relativity?",
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
        question: "Who developed the theory of ACDC?",
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
    ],
    "Bank B": [
      {
        type: "MCQ",
        question: "Who developed the theory of relativity?",
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
    ],
  });

  useEffect(()=>{
    console.log(selectedCard)
    if(selectedCard.length == 0) {
      removeQBQuestions([]);
    }
    else {
      selectedCard.map((card)=> {
        addQBQuestions(questionBanks[card]); 
      })
    }
  }, [selectedCard])

  const handleCardClick = (bankName) => {
    const isSelected = selectedCard.includes(bankName);
    if (isSelected) {
      setSelectedCard(selectedCard.filter(card => card !== bankName));
    } else {
      setSelectedCard([...selectedCard, bankName]);
    }
    console.log(selectedCard)
  };

  const updateQuestionsFromSelectedBanks = () => {
      let updatedQuestions = [];
      //setQBQuestions(questionBanks[selectedCard]);
      return updatedQuestions;
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='md:w-3/4 w-full'>
        <SearchBar />
      </div>
      <div className='flex flex-wrap gap-8'>
        {Object.entries(questionBanks).map(([bankName, bank]) => (
          <QuestionBankSelectionbars
            key={bankName}
            bankName={bankName}
            bank={bank}
            isSelected={selectedCard === bankName}
            onClick={() => handleCardClick(bankName)}
          />
        ))}
      </div>
      {/* <div className='flex flex-col gap-2'>
        {filteredQuestions.map((question, index) => (
          <DisplayOnlyQuestions
            key={index}
            skill={question.skill}
            difficulty={question.difficulty}
            point={question.point}
            question={question.question}
            explanation={question.explanation}
            options={question.options}
            image={question.imageUrl}
          />
        ))}
      </div> */}
    </div>
  );
};

export default QuestionBankSelection;
