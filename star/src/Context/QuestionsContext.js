import React, { createContext, useState, useEffect } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [questions, setQuestionSet] = useState([]);
  const [QBquestions, setQBQuestionSet] = useState([])
  const [reuseQuestions, setReuseQuestions] = useState([])

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
    const newQuestions = reuseQuestions.filter(question => !questions.some(q => q.question === question.question));
    setQuestionSet([...questions, ...newQuestions]);
    setReuseQuestions([]);  
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
      value={{ swapQuestion, questions, addQuestion, updateQuestion, removeQuestion, clearQuestionSet, setQuestions, saveQuestions, addQBQuestions, removeQBQuestions, reuseQuestions, setReuseQuestions }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
