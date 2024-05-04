import React, { useState } from 'react';
import { GoCheck } from "react-icons/go";
import { IoMdClose } from "react-icons/io";

const ResultSummary = ({ correctAnswers, wrongAnswers, obtainedMarks, totalMarks  , questionNumbers}) => {
  const [currentQuestion, SetCurrentQuestion] = useState(0);

  const handleQuestionClick = ({questionNumber}) => {
    SetCurrentQuestion(questionNumber)
  }

};

export default ResultSummary;