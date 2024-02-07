import React from 'react';

const QuizImage = ({ imageUrl }) => {
  return (
    <div className="flex object-contain w-full h-full">
      <img
        src={imageUrl}
        alt="Quiz Image"
      />
    </div>
  );
};

export default QuizImage;
