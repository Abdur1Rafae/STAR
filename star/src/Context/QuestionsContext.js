// QuestionContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const QuestionContext = createContext({ questions: [{
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
  },{
    type: "T/F",
    question: "The mitochondria is the powerhouse of the cell.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    imageUrl: null,
    explanation: "True. The mitochondria is known as the powerhouse of the cell.",
    skill: "Biology",
    difficulty: "Medium",
    point: 15
  },
  {
    type: "SA",
    question: "What is the capital of Mongolia?",
    options: [],
    imageUrl: null,
    explanation: "The capital of Mongolia is Ulaanbaatar.",
    skill: "Geography",
    difficulty: "Medium",
    point: 15
  },
  {
    type: "MCQ",
    question: "Which country has the largest population?",
    options: [
      { text: "India", isCorrect: false },
      { text: "United States", isCorrect: false },
      { text: "China", isCorrect: true },
      { text: "Russia", isCorrect: false }
    ],
    imageUrl: null,
    explanation: "China has the largest population.",
    skill: "Geography",
    difficulty: "Medium",
    point: 15
  },
  {
    type: "T/F",
    question: "The Amazon Rainforest produces 20% of the world's oxygen.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    imageUrl: "https://files.worldwildlife.org/wwfcmsprod/images/Amazon_River_New_Hero_Image/hero_full/96jxl0p02y_Amazon_River_Hero.jpg",
    explanation: "True. The Amazon Rainforest is often referred to as the 'lungs of the Earth' as it produces a significant amount of the world's oxygen.",
    skill: "Environmental Science",
    difficulty: "Hard",
    point: 20
  },
  {
    type: "SA",
    question: "What is the formula for calculating the area of a circle?",
    options: [],
    imageUrl: null,
    explanation: "The formula for calculating the area of a circle is A = πr^2, where 'A' is the area and 'r' is the radius of the circle.",
    skill: "Mathematics",
    difficulty: "Hard",
    point: 20
  }], setQuestions: () => {} });

export const useQuestionContext = () => useContext(QuestionContext);


export const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([{
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
  },{
    type: "T/F",
    question: "The mitochondria is the powerhouse of the cell.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    imageUrl: null,
    explanation: "True. The mitochondria is known as the powerhouse of the cell.",
    skill: "Biology",
    difficulty: "Medium",
    point: 15
  },
  {
    type: "SA",
    question: "What is the capital of Mongolia?",
    options: [],
    imageUrl: null,
    explanation: "The capital of Mongolia is Ulaanbaatar.",
    skill: "Geography",
    difficulty: "Medium",
    point: 15
  },
  {
    type: "MCQ",
    question: "Which country has the largest population?",
    options: [
      { text: "India", isCorrect: false },
      { text: "United States", isCorrect: false },
      { text: "China", isCorrect: true },
      { text: "Russia", isCorrect: false }
    ],
    imageUrl: null,
    explanation: "China has the largest population.",
    skill: "Geography",
    difficulty: "Medium",
    point: 15
  },
  {
    type: "T/F",
    question: "The Amazon Rainforest produces 20% of the world's oxygen.",
    options: [
      { text: "True", isCorrect: true },
      { text: "False", isCorrect: false }
    ],
    imageUrl: "https://files.worldwildlife.org/wwfcmsprod/images/Amazon_River_New_Hero_Image/hero_full/96jxl0p02y_Amazon_River_Hero.jpg",
    explanation: "True. The Amazon Rainforest is often referred to as the 'lungs of the Earth' as it produces a significant amount of the world's oxygen.",
    skill: "Environmental Science",
    difficulty: "Hard",
    point: 20
  },
  {
    type: "SA",
    question: "What is the formula for calculating the area of a circle?",
    options: [],
    imageUrl: null,
    explanation: "The formula for calculating the area of a circle is A = πr^2, where 'A' is the area and 'r' is the radius of the circle.",
    skill: "Mathematics",
    difficulty: "Hard",
    point: 20
  }]);

  return (
    <QuestionContext.Provider value={{ questions, setQuestions }}>
      {children}
    </QuestionContext.Provider>
  );
};
