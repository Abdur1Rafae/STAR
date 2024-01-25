// QuizImage.js
import React from 'react';

const QuizImage = ({ imageUrl }) => {
  return (
    <div className="flex place-content-center  h-80">
      <img
        src={imageUrl}
        alt="Quiz Image"
        
      />
    </div>
  );
};

export default QuizImage;
