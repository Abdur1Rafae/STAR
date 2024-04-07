import React, { createContext, useState } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestionSet] = useState([{
    _id: null,
    type: "Multiple Choice Question",
    reuse: true,
    question: "Who developed the theory of relativity?",
    options: ["Isaac Newton","Albert Einstein","Stephen Hawking","Galileo Galilei"],
    correctOptions: ["Albert Einstein"],
    imageUrl: "https://scitechdaily.com/images/Theory-of-Relativity-Physics-Concept.jpg",
    explanation: "Albert Einstein developed the theory of relativity.",
    skill: "Physics",
    difficulty: "Hard",
    point: 20
  },
  {
    type: "True/False",
    reuse: true,
    question: "You are alive.",
    options: ["True", "False"],
    correctOptions: [],
    isTrue: true,
    imageUrl: null,
    explanation: "Stephen Hawking developed the theory of relativity.",
    skill: "Physics",
    difficulty: "Hard",
    point: 20
  },
  {
    type: "Short Answer",
    reuse: true,
    question: "Tell me about yourself",
    correctOptions:[],
    options: [],
    imageUrl: null,
    explanation: "",
    skill: "Physics",
    difficulty: "Hard",
    point: 20.
  }]);
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
