// QuizImage.js
import React from 'react';

const QuizImage = ({ imageUrl }) => {
  return (
    <div className="quiz-image">
      <img
        src={imageUrl}
        alt="Quiz Image"
        className="w-64 h-auto sm:object-[center_bottom] md:object-[center_bottom]"
      />
    </div>
  );
};

export default QuizImage;
