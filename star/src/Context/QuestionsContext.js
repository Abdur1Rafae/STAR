import React, { createContext, useState, useEffect } from 'react';

export const QuestionContext = createContext();

export const QuestionProvider = ({ children }) => {
  const [topicMap, setTopicMap] = useState({});
  const [skillMap, setSkillMap] = useState([])
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
    points: 20
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
    points: 20
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
    points: 20.
  }]);
  const [reuseQuestions, setReuseQuestions] = useState([])
  const [selectedQuestions, setSelectedQuestions] = useState([])

  const addQuestion = (question) => {
    setQuestionSet([...questions, question]);
  };

  useEffect(() => {
    const newTopicMap = {};
    const skillsArray = []
    questions.forEach(question => {
      if (question.topic in newTopicMap) {
        newTopicMap[question.topic]++;
      } else {
        newTopicMap[question.topic] = 1;
      }

      if(!skillsArray.includes(question.skill)) {
        skillsArray.push(question.skill)
      }
    });
    setTopicMap(newTopicMap);
    setSkillMap(skillsArray)
    console.log(skillsArray)
  }, [questions]);

  const updateQuestion = ({ index, updatedQuestion }) => {
    const updatedQuestionSet = [...questions];
    updatedQuestionSet[index] = updatedQuestion;
    setQuestionSet(updatedQuestionSet);
  };

  const removeQuestion = (index) => {
    const updatedQuestionSet = [...questions];
    const removedQuestion = updatedQuestionSet.splice(index, 1)[0];
    if (removedQuestion.topic in topicMap) {
      const newTopicMap = { ...topicMap };
      newTopicMap[removedQuestion.topic]--;
      if (newTopicMap[removedQuestion.topic] === 0) {
        delete newTopicMap[removedQuestion.topic];
      }
      setTopicMap(newTopicMap);
    }
    const skillsArray = []
    updatedQuestionSet.forEach((question)=>{
      if(!skillsArray.includes(question.skill)) {
        skillsArray.push(question.skill)
      }
    })

    setSkillMap(skillsArray)
    
    setQuestionSet(updatedQuestionSet);
    
  };


  const clearQuestionSet = () => {
    setQuestionSet([]);
    setTopicMap({});
  };

  const setQuestions = (questions) => {
    setQuestionSet(questions)
  }

  const saveQuestions = () => {
    setQuestionSet([...questions, ...selectedQuestions]);
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
      value={{ swapQuestion, questions, addQuestion, selectedQuestions, setSelectedQuestions, updateQuestion, removeQuestion, clearQuestionSet, setQuestions, saveQuestions, reuseQuestions, setReuseQuestions, topicMap, skillMap }}
    >
      {children}
    </QuestionContext.Provider>
  );
};
