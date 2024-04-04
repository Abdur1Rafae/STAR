import React, { createContext, useState, useEffect } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestionSet] = useState([{
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
  },]);
  const [QBquestions, setQBQuestionSet] = useState([])

  // useEffect(() => {
  //   localStorage.setItem('questionSet', JSON.stringify(questionSet));
  // }, [questionSet]);

  const setQBQuestions = (questionSet) => {
    console.log(questionSet)
    setQBQuestionSet([questionSet])
  }

  const addQuestion = (question) => {
    console.log(questions)
    setQuestionSet([...questions, question]);
  };

  const updateQuestion = ({ index, updatedQuestion }) => {
    const updatedQuestionSet = [...questions];
    updatedQuestionSet[index] = updatedQuestion;
    setQuestionSet(updatedQuestionSet);
  };

  const removeQuestion = (index) => {
    const updatedQuestionSet = [...questions];
    updatedQuestionSet.splice(index, 1);
    setQuestionSet(updatedQuestionSet);
  };

  const clearQuestionSet = () => {
    setQuestionSet([]);
  };

  const setQuestions = (questions) => {
    setQuestionSet(questions)
  }

  const saveQuestions = () => {
    console.log(QBquestions[0].length)
    setQuestionSet([...questions, ...QBquestions[0]]);
  }

  return (
    <QuestionContext.Provider
      value={{ questions, addQuestion, updateQuestion, removeQuestion, clearQuestionSet, setQuestions, saveQuestions, setQBQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
