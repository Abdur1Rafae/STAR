import React, { useState, useContext } from 'react';
import SearchBar from '../../components/Teacher/SearchBar';
import QuestionBankCard from '../../components/Teacher/QuestionBankCard';
import DisplayOnlyQuestions from '../../components/Teacher/DisplayOnlyQuestions';
import { useEffect } from 'react';
import { QuestionContext } from '../../Context/QuestionsContext';



const QuestionBankSelection = () => {
  const { QBquestions , setQBQuestions, } = useContext(QuestionContext);
  const [selectedCard, setSelectedCard] = useState(null);
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
    if(selectedCard == null) {
      setFilteredQuestions([])
      setQBQuestions([]);
    }
    else {
      setFilteredQuestions(questionBanks[selectedCard])
      setQBQuestions(questionBanks[selectedCard]);
    }
  }, [selectedCard])

  const handleCardClick = (bankName) => {
    if (selectedCard === bankName) {
      setSelectedCard(null);
    } else {
      setSelectedCard(bankName);
    }
  };

  const [filteredQuestions, setFilteredQuestions] = useState([])

  const updateQuestionsFromSelectedBanks = () => {
      let updatedQuestions = [];
      console.log(questionBanks[selectedCard])
      setQBQuestions(questionBanks[selectedCard]);
      return updatedQuestions;
  };

  // useEffect(() => {

    
  // }, [filteredQuestions]);
  //     updateQuestionsFromSelectedBanks();
  // }, [selectedCards, questionBanks]);



  return (
    <div className='flex flex-col gap-4'>
      <div className='md:w-3/4 w-full'>
        <SearchBar />
      </div>
      <div className='flex flex-wrap gap-8'>
        {
        Object.keys(questionBanks).map((bankName) => (
          <QuestionBankCard
            key={bankName}
            isselection={selectedCard == bankName}
            onClick={() => handleCardClick(bankName)}
          />
        ))}
      </div>
      <div className='flex flex-col gap-2'>
        {filteredQuestions.map((question, index)=> {
          return <DisplayOnlyQuestions skill={question.skill} difficulty={question.difficulty} point={question.point} question={question.question} explanation={question.explanation} options={question.options} image={question.imageUrl}/>
          })
        }
       
      </div>
    </div>
  );
};

export default QuestionBankSelection;
