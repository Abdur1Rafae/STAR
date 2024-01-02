// QuizImage.js
import React from 'react';

const QuizImage = ({ imageUrl }) => {
  return (
    <div className="quiz-image">
      <img
        src={imageUrl}
        alt="Quiz Image"
        className="w-full h-auto sm:w-64 sm:h-80 md:w-96 md:h-96 lg:w-2/3 lg:h-auto xl:w-2/3 xl:h-auto"
      />
    </div>
  );
};

export default QuizImage;
