import React, { createContext, useState, useEffect } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestionSet] = useState([]);
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
