import React, { createContext, useState } from 'react';

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
  const [reuseQuestions, setReuseQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])

  // useEffect(() => {
  //   localStorage.setItem('questionSet', JSON.stringify(questionSet));
  // }, [questionSet]);

  const addQBQuestions = (questionSet) => {
    setQBQuestionSet([...QBquestions, questionSet])
  }

  const addQuestion = (question) => {
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

  const removeQBQuestions = (index) => {
    setQBQuestionSet([])
  }

  const clearQuestionSet = () => {
    setQuestionSet([]);
  };

  const setQuestions = (questions) => {
    setQuestionSet(questions)
  }

  const saveQuestions = () => {
    const newQuestions = selectedQuestions.filter(question => !questions.some(q => q.question === question.question));
    setQuestionSet([...questions, ...newQuestions]);
    setSelectedQuestions([]);  
  }

  const swapQuestion = (id1, id2) => {
    const newQuestions = [...questions]
    const temp = newQuestions[id1];
    newQuestions[id1] = newQuestions[id2];
    newQuestions[id2] = temp;
    setQuestions(newQuestions)
  }


  return (
    <QuestionContext.Provider
      value={{ swapQuestion, questions, addQuestion, selectedQuestions, setSelectedQuestions, updateQuestion, removeQuestion, clearQuestionSet, setQuestions, saveQuestions, addQBQuestions, removeQBQuestions, reuseQuestions, setReuseQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
